import { createApp } from './index';
import categorias from '../../../../../.tmp/_site/api/productosData/categorias.json';

export default context =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const vueMeta = app.$meta();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject(new Error({ code: 404 }));
      }

      const promesas = [Promise.resolve(store.commit('setCategorias', { categorias }))];

      const slug = router.currentRoute.params.slug ? router.currentRoute.params.slug : 'index';
      const data = require(`../../../../../.tmp/_site/api/catalogoData/${slug}.json`); // eslint-disable-line
      promesas.push(Promise.resolve(store.commit('setData', { slug, data })));

      Promise.all(promesas)
        .then(() => {
          const { title, meta, link } = vueMeta.inject();
          context.state = store.state;
          context.title = title.text();
          context.meta = meta.text();
          context.link = link.text();

          resolve(app);
        }).catch(reject);
    }, reject);
  });
