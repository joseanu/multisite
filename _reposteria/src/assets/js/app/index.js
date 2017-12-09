import Vue from 'vue';
import Meta from 'vue-meta';
import createStore from './store';
import createRouter from './router';
import App from './App.vue';
import ProgressBar from './Components/ProgressBar.vue';

// global progress bar
const bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el);

Vue.use(Meta);

const baseURL = '';

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
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);

      let diffed = false;
      const activated = matched.filter(
        (c, i) => diffed || (diffed = prevMatched[i] !== c),
      );

      const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
      if (!asyncDataHooks.length) {
        return next();
      }

      app.$bar.start();
      console.log('entro aqui');

      return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
        .then(() => {
          app.$bar.finish();

          next();
        })
        .catch(next);
    });

    app.$mount('#app');
  });
}

export default createInstance;
