import Vue from 'vue';
import Router from 'vue-router';

import Index from './Views/Index.vue';
import Pagina from './Views/Pagina.vue';
import Catalogo from './Views/Catalogo.vue';
import Categoria from './Components/Categoria.vue';
import Buscar from './Components/Buscar.vue';

Vue.use(Router);

function createRouter(baseURL) {
  return new Router({
    mode: 'history',
    linkActiveClass: 'activo',
    routes: [
      {
        path: `${baseURL}`,
        name: 'index',
        component: Index,
      },
      {
        path: `${baseURL}/:pageSlug`,
        name: 'pagina',
        component: Pagina,
      },
      {
        path: `${baseURL}/catalogo`,
        name: 'catalogo',
        component: Catalogo,
        children: [
          {
            path: `${baseURL}/catalogo/buscar/:busqueda`,
            name: 'buscar',
            component: Buscar,
          },
          {
            path: `${baseURL}/catalogo/:categoria`,
            name: 'categoria',
            component: Categoria,
          },
        ],
      },
    ],
  });
}

export default createRouter;
