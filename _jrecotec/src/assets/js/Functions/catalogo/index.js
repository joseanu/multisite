import Vue from 'vue';
import createStore from './store';
import createRouter from './router';
import titleMixin from './mixins/title';
import App from './App.vue';

Vue.mixin(titleMixin);

const baseURL = 'vuecatalogo';

export function createApp() {
  const store = createStore();
  const router = createRouter(baseURL);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}

function createInstance() {
  const { app, router, store } = createApp();

  if (window.__INITIAL_STATE__) { // eslint-disable-line
    store.replaceState(window.__INITIAL_STATE__); // eslint-disable-line
  }

  router.onReady(() => {
    // actually mount to DOM
    app.$mount('#app');
  });
}

export default createInstance;
