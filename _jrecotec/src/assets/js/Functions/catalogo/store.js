import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    state: {
      categorias: [],
      productos: {},
      imagenes: {},
      datosListos: false,
    },
    actions: {
      fetchData({ commit, state }) {
        if (state.datosListos === true) {
          return Promise.resolve('Success');
        }
        return Promise.all([
          axios.get('/api/productosData/categorias.json'),
          axios.get('/api/productosData/productos.json'),
          axios.get('/api/productosData/imagenes.json'),
        ])
          .then(([categorias, productos, imagenes]) => {
            commit('setData', {
              categorias: categorias.data,
              productos: productos.data,
              imagenes: imagenes.data,
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      },
    },

    mutations: {
      setData(state, { categorias, productos, imagenes }) {
        state.categorias = categorias;
        state.productos = productos;
        state.imagenes = imagenes;
        state.datosListos = true;
      },
    },

    getters: {
      getCategorias: state =>
        state.categorias.filter(categoria => categoria.slug.indexOf('/') === -1),

      getCategoriaBySlug: state => slug =>
        state.categorias.find(categoria => categoria.slug === slug),

      getContenidosBySlug: state => slug =>
        (state.productos[slug] && state.productos[slug].contenidos) || 0,
    },
  });
}

export default createStore;
