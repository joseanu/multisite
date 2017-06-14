const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const { createBundleRenderer } = require('vue-server-renderer');

const baseURL = '/vuecatalogo/';

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function generar(callback) {
  const bundle = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "./build/vue-ssr-server-bundle.json"),
      "utf8"
    )
  );
  const template = fs.readFileSync(
    path.resolve(__dirname, "../.tmp/_site/vuecatalogo/index.html"),
    "utf-8"
  );

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: true,
    template,
  });

  const renderToString = promisify(renderer.renderToString);

  const routes = require('../.tmp/_site/api/productosData/categorias.json');

  routes['/'] = 'Indice';

  const promesas = Object.keys(routes).map(async (slug) => {
    let prop;

    if (slug === '/') {
      prop = '';
    } else {
      prop = slug;
    }

    const route = `${baseURL}${prop}`;

    const filePath = path.join(path.resolve(__dirname, "../_site"), route, "/index.html");
    ensureDirectoryExistence(filePath);

    const context = {
      url: route,
      meta: '',
    };

    const html = await renderToString(context);

    if (html) {
      console.log(`Se generó la ruta: ${slug}`);
      return writeFile(filePath, html);
    }
    return Promise.reject(new Error('fail'));
  });

  Promise.all(promesas)
    .then(() => {
      console.log('Terminó Vue SSR');
      callback();
    })
    .catch(error => {
      console.log('¡Sucedió algo extraño!');
      console.log(error);
    });
};

module.exports = generar;
