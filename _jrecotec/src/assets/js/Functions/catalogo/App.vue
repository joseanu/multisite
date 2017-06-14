<template>
  <div id="app">
    <productos-link></productos-link>

    <transition name="move" mode="out-in">
      <router-view v-if="datosListos" :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
  import ProductosLink from './components/ProductosLink.vue';

  export default {
    asyncData({ store }) {
      return store.dispatch('fetchData');
    },
    computed: {
      datosListos() {
        return this.$store.state.datosListos;
      },
      key() {
        return this.$route.params.slug !== undefined
          ? this.$route.params.slug
          : this.$route;
      },
    },
    components: {
      ProductosLink,
    },
    beforeMount() {
      const { asyncData } = this.$options;
      if (asyncData) {
        this.dataPromise = asyncData({
          store: this.$store,
        });
      }
    },
  };
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .move-leave-active {
  	animation: moveToLeft .4s ease both;
  }
  .move-enter-active {
  	animation: moveFromRight .4s ease both;
  }
  @keyframes moveToLeft {
  	from { }
  	to { transform: translateX(-100%); }
  }
  @keyframes moveFromRight {
  	from { transform: translateX(100%); }
  }
</style>
