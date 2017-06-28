import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function createRouter(baseURL) {
  return new Router({
    mode: 'history',
    linkActiveClass: 'activo',
    routes: [
      {
        path: `/${baseURL}`,
        name: 'index',
        component: () => import(/* webpackChunkName: "catalogoCategoria" */ './views/Categoria.vue'),
      },
      {
        path: `/${baseURL}/:slug`,
        name: 'categoria',
        component: () => import(/* webpackChunkName: "catalogoCategoria" */ './views/Categoria.vue'),
        children: [
          {
            path: 'cotizar',
            name: 'cotizar',
            component: () => import(/* webpackChunkName: "cotizarSolar" */ './components/energia-solar/cotizar/Cotizador.vue'),
          },
        ],
      },
    ],
  });
}

export default createRouter;
