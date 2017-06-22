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

  const origin = 'https://www.jrecotecnologia.com';

  export default {
    metaInfo() {
      return {
        title: this.titulo,
        titleTemplate: '%s - JR Ecotecnología',
        meta: [
          { name: 'description', content: this.titulo },
        ],
        link: [
          { rel: 'canonical', href: `${origin}${this.$route.path}` },
        ],
      };
    },
    asyncData({ store }) {
      return store.dispatch('fetchData');
    },
    computed: {
      datosListos() {
        return this.$store.state.datosListos;
      },
      slug() {
        if (this.$route.params.slug !== undefined) {
          return this.$route.params.slug;
        }
        return 'vuecatalogo';
      },
      titulo() {
        if (this.$route.params.slug !== undefined) {
          return this.$store.state.categorias[this.$route.params.slug].nombre;
        }
        return 'Catálogo de Ecotecnologías';
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
    beforeUpdate() {
      document.querySelector('.subHeader-pageTitle h1').innerHTML = this.titulo;
      document.querySelector('.breadcrumb__lastItem span').innerHTML = this.titulo;
      document.querySelector('.breadcrumb__lastItem').href = `${origin}${this.$route.path}`;
    },
  };
</script>
