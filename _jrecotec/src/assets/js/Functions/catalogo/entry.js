import { createApp } from './index';
import categorias from '../../../../../.tmp/_site/api/productosData/categorias.json';
import productos from '../../../../../.tmp/_site/api/productosData/productos.json';
import imagenes from '../../../../../.tmp/_site/api/productosData/imagenes.json';

export default context =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const vueMeta = app.$meta();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      Promise.resolve(
        store.commit('setData', { categorias, productos, imagenes }),
      ).then(() => {
        const { title, meta, link } = vueMeta.inject();
        context.state = store.state;
        context.titulo = app.titulo;
        context.slug = app.slug;
        context.title = title.text();
        context.meta = meta.text();
        context.link = link.text();

        resolve(app);
      }).catch(reject);
    }, reject);
  });
