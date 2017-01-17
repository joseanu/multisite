export default {

  home: function() {
    require.ensure([], () => {
  		var Home = require('./home/index').default;
      Home();
  	}, 'home');
  },

  productosGrid: function() {
    require.ensure([], () => {
  		var Productos = require('./productosGrid').default;
      Productos();
  	}, 'productos');
  },

  form: require('./form').default,

  cotizaSolar: function() {
    require.ensure([], () => {
  		var Cotizador = require('./cotizaSolar/index').default;
      Cotizador();
  	}, 'cotizaSolar');
  }

};