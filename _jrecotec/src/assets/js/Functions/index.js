import initForm from './form';

export default {

  home() {
    import(/* webpackChunkName: "homeScripts" */ './home/index').then((Home) => {
      Home.default();
    }).catch((err) => {
      throw new Error(err);
    });
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
      throw new Error(err);
    });
  },
};
