import initForm from './form';

export default {

  home() {
    import(/* webpackChunkName: "homeScripts" */ './home/index').then((Home) => {
      Home.default();
    }).catch((err) => {
      throw new Error(err);
    });
  },

  form: initForm,

  catalogo() {
    import(/* webpackChunkName: "catalogoMain" */ './catalogo/index').then((catalogo) => {
      catalogo.default();
    }).catch((err) => {
      throw new Error(err);
    });
  },
};
