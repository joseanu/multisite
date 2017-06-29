const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const { createBundleRenderer } = require('vue-server-renderer');

const baseURL = '/ecotecnologias/';

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
      path.resolve(__dirname, "../.tmp/vue-ssr-build/vue-ssr-server-bundle.json"),
      "utf8"
    )
  );

  const categorias = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../.tmp/_site/api/productosData/categorias.json"),
      "utf8"
    )
  );

  const routes = categorias.map(el => el.slug);

  routes.push('/');

  const promesas = routes.map(async (slug) => {
    let prop;

    if (slug === '/') {
      prop = '';
    } else {
      prop = slug;
    }

    const route = `${baseURL}${prop}`;

    const filePath = path.join(path.resolve(__dirname, "../_site"), route, "/index.html");
    ensureDirectoryExistence(filePath);

    const template = fs.readFileSync(
      filePath,
      "utf-8"
    );
  
    const renderer = createBundleRenderer(bundle, {
      runInNewContext: true,
      template,
    });
    const renderToString = promisify(renderer.renderToString);

    const context = {
      url: route,
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
