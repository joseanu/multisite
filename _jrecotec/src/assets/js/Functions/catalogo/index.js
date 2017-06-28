import Vue from 'vue';
import Meta from 'vue-meta';
import createStore from './store';
import createRouter from './router';
import App from './App.vue';

Vue.use(Meta);

const baseURL = 'ecotecnologias';

export function createApp() {
  const store = createStore();
  const router = createRouter(baseURL);

  const app = new Vue(Object.assign(App, { router, store }));

  return { app, router, store };
}

function createInstance() {
  const { app, router, store } = createApp();

  if (window.__INITIAL_STATE__) { // eslint-disable-line
    store.replaceState(window.__INITIAL_STATE__); // eslint-disable-line
  }

  window.vueRouter = router;

  router.onReady(() => {
    app.$mount('#app');
  });
}

export default createInstance;
