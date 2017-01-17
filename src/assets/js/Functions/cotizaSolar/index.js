import Vue from 'vue';

import Cotizador from './cotizador.vue';

function instanciarVue() {
  const vm = new Vue({
    el: '#app',
    components: {
      app: Cotizador,
    },
    render: h => h('app'),
  });
}

export default instanciarVue;
