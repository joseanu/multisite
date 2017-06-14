import initForm from './form';

export default {

  home() {
    require.ensure([], (require) => {
      const Home = require('./home/index').default;
      Home();
    }, 'home');
  },

  productosGrid() {
    require.ensure([], (require) => {
      const Productos = require('./productosGrid').default;
      Productos();
    }, 'productosGrid');
  },

  form: initForm,

  cotizaSolar() {
    require.ensure([], (require) => {
      const Cotizador = require('./cotizaSolar/index').default;
      Cotizador();
    }, 'cotizaSolar');
  },

  catalogo() {
    import(/* webpackChunkName: "catalogoMain" */ './catalogo/index').then((catalogo) => {
      catalogo.default();
    }).catch((err) => {
      console.log('Failed to load Catalogo', err);
    });
  },
};
