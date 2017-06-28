<template>
  <div id="app" v-if="datosListos">
    <div class="wrapper productosHeader bab">
      <productos-link></productos-link>
    </div>

    <transition name="move" mode="out-in">
      <router-view :key="parametro"></router-view>
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
        titleTemplate: 'Catálogo de Ecotecnologías %s - JR Ecotecnología',
        meta: [
          { name: 'description', content: this.titulo },
        ],
        link: [
          { rel: 'canonical', href: `${origin}${this.$route.path}` },
        ],
        script: [
          { innerHTML: '{ "@context": "http://schema.org" }', type: 'application/ld+json' },
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
      parametro() {
        if (this.$route.params.slug !== undefined) {
          return this.$route.params.slug;
        }
        return 'ecotecnologias';
      },
      titulo() {
        if (this.parametro !== 'ecotecnologias') {
          return this.$store.getters.getCategoriaBySlug(this.parametro).nombre;
        }
        return '';
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
