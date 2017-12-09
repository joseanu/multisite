import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const httpClient = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/8sbn69472oqm',
  headers: {
    Authorization: 'Bearer ed01dbe2055fd5c753eb827219aa7545934295a9c727f891b931b4c620ffc3a8',
  },
  timeout: 30000,
  retryOnError: true,
  proxy: false,
});

function relacionaImg(datos) {
  return datos.items.map((item) => {
    const url = datos.includes.Asset.filter(
      el => el.sys.id === item.fields.imagen.sys.id,
    )[0].fields.file.url;

    return {
      id: item.sys.id,
      titulo: item.fields.titulo,
      descripcion: item.fields.descripcion || false,
      url,
      etiquetas: item.fields.etiquetas || [],
    };
  });
}

function agregaImagenes(datos) {
  datos.items.forEach((item, index, array) => {
    const url = datos.includes.Asset.filter(
      el => el.sys.id === item.fields.imagen.sys.id,
    )[0].fields.file.url;
    array[index].fields.imagen = url;
  });
}

function createStore() {
  return new Vuex.Store({
    state: {
      menu: {},
      menuListo: false,
      paginas: {},
      categorias: {},
      busquedas: {},
    },
    actions: {
      fetchMenu({ commit, state }) {
        if (state.menuListo) {
          return Promise.resolve();
        }
        return Promise.all([
          httpClient.get('/entries', {
            params: {
              content_type: 'pagina',
              select:
                'sys.id,fields.titulo,fields.slug,fields.orden',
              order: 'fields.orden',
            },
          }),
          httpClient.get('/entries', {
            params: {
              content_type: 'categoriaDePasteles',
              select:
                'sys.id,fields.nombre,fields.slug,fields.imagen,fields.orden,fields.categoria,fields.mostrarEnHome',
              order: 'fields.orden',
            },
          }),
        ])
          .then(([paginas, categorias]) => {
            commit('setMenu', {
              paginas: paginas.data,
              categorias: categorias.data,
            });
          })
          .catch(console.error);
      },

      fetchPage({ commit, state }, slug) {
        const pageId = state.menu.paginas.filter(
          pagina => pagina.fields.slug === slug,
        )[0].sys.id;
        if (state.paginas[slug]) {
          return Promise.resolve();
        }
        return httpClient
          .get(`/entries/${pageId}`)
          .then((entry) => {
            commit('setPage', { slug, page: entry.data.fields });
          })
          .catch(console.error);
      },

      fetchCategoria({ commit, state }, slug) {
        const categoriaId = state.menu.catalogo.filter(
          categoria => categoria.fields.slug === slug,
        )[0].sys.id;
        if (state.categorias[slug]) {
          return Promise.resolve();
        }
        return Promise.all([
          httpClient.get(`/entries/${categoriaId}`),
          httpClient.get('/entries', {
            params: {
              content_type: 'imagen',
              select:
                'sys.id,fields.titulo,fields.descripcion,fields.imagen,fields.etiquetas',
              'fields.categoria.sys.id': categoriaId,
            },
          }),
        ])
          .then(([entry, items]) => {
            let imagenes = [];
            if (items.data.total > 0) {
              imagenes = relacionaImg(items.data);
            }
            commit('setCategoria', {
              slug,
              categoria: entry.data.fields,
              imagenes,
            });
          })
          .catch(console.error);
      },

      buscarImagenes({ commit, state }, busqueda) {
        if (state.busquedas[busqueda]) {
          return Promise.resolve();
        }
        return httpClient
          .get('/entries', {
            params: {
              content_type: 'imagen',
              query: busqueda,
              select:
                'sys.id,fields.titulo,fields.descripcion,fields.imagen,fields.etiquetas',
            },
          })
          .then((items) => {
            let imagenes = [];
            if (items.data.total > 0) {
              imagenes = relacionaImg(items.data);
            }
            commit('setResultados', { busqueda, imagenes });
          })
          .catch(console.error);
      },
    },

    mutations: {
      setMenu(state, { paginas, categorias }) {
        agregaImagenes(categorias);
        Vue.set(state.menu, 'paginas', paginas.items);
        Vue.set(state.menu, 'catalogo', categorias.items);
        state.menuListo = true;
      },

      setPage(state, { slug, page }) {
        Vue.set(state.paginas, slug, page);
      },

      setCategoria(state, { slug, categoria, imagenes }) {
        Vue.set(state.categorias, slug, categoria);
        Vue.set(state.categorias[slug], 'imagenes', imagenes);
      },

      setResultados(state, { busqueda, imagenes }) {
        Vue.set(state.busquedas, busqueda, imagenes);
      },
    },

    getters: {
      getCategoriasHome: state =>
        state.menuListo &&
        state.menu.catalogo.filter(categoria => categoria.fields.mostrarEnHome),

      getPageBySlug: state => slug => state.paginas[slug],

      getCategoriaBySlug: state => slug => state.categorias[slug],

      getResultados: state => busqueda => state.busquedas[busqueda],
    },

  });
}

export default createStore;
