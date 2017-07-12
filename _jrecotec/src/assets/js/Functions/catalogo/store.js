import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    state: {
      categorias: [],
      catalogo: {},
    },
    actions: {
      fetchData({ commit, state }, slug) {
        if (state.categorias.length === 0) {
          axios.get('/api/productosData/categorias.json')
          .then((response) => {
            commit('setCategorias', { categorias: response.data });
          })
          .catch((error) => {
            throw new Error(error);
          });
        }
        if (state.catalogo[slug]) {
          return Promise.resolve();
        }
        return axios.get(`/api/catalogoData/${slug}.json`)
          .then((response) => {
            commit('setData', {
              slug,
              data: response.data,
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      },
    },

    mutations: {
      setCategorias(state, { categorias }) {
        state.categorias = categorias;
      },
      setData(state, { slug, data }) {
        Vue.set(state.catalogo, slug, data);
      },
    },

    getters: {
      getCategorias: state =>
        state.categorias.filter(categoria => categoria.slug.indexOf('/') === -1),

      getCategoriaBySlug: state => slug =>
        state.categorias.find(categoria => categoria.slug === slug),

      getContenidosBySlug: state => slug =>
        (state.catalogo[slug] && state.catalogo[slug].contenidos) || 0,

      getProductosBySlug: state => slug =>
        (state.catalogo[slug] && state.catalogo[slug].productos) || {},

      getImagenesBySlug: state => slug =>
        (state.catalogo[slug] && state.catalogo[slug].imagenes) || 0,

      getFiltrosBySlug: state => slug =>
        (state.catalogo[slug] && state.catalogo[slug].tipos) || 0,
    },
  });
}

export default createStore;
