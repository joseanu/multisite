<template>
  <transition name="slide-up" appear>
    <div id="app">
      <main-head></main-head>
      <tab-bar></tab-bar>
      <div class="contenido">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.path"></router-view>
        </transition>
      </div>
      <app-footer></app-footer>
    </div>
  </transition>
</template>

<script>
  import MainHead from './Components/MainHead.vue';
  import tabBar from './Components/tabBar.vue';
  import AppFooter from './Components/Footer.vue';

  export default {
    metaInfo() {
      return {
        title: 'Pasteles',
        meta: [
          { name: 'description', content: 'descripcion' },
        ],
      };
    },
    computed: {},
    components: {
      MainHead,
      tabBar,
      AppFooter,
    },
    beforeMount() {
      this.$store.dispatch('fetchMenu');
    },
  };
</script>
