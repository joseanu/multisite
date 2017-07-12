<template>
  <div id="app">
    <div class="wrapper productosHeader">
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
        title: `Catálogo de Ecotecnologías${this.metadatos ? `: ${this.metadatos.nombre}` : ''} - JR Ecotecnología`,
        meta: [
          { name: 'description', content: this.descripcion },
        ],
        link: [
          { rel: 'canonical', href: `${origin}${this.$route.path}` },
        ],
      };
    },
    computed: {
      parametro() {
        if (this.$route.params.slug !== undefined) {
          return this.$route.params.slug;
        }
        return 'index';
      },
      metadatos() {
        if (this.parametro !== 'index') {
          return this.$store.getters.getCategoriaBySlug(this.parametro);
        }
        return false;
      },
      descripcion() {
        return this.metadatos
          ? this.metadatos.slogan
          : 'Conoce nuestras ecotecnologías, cuida el medio ambiente y ahorra energía eléctrica, agua y gas.';
      },
    },
    components: {
      ProductosLink,
    },
    beforeUpdate() {
      document.querySelector('.subHeader-pageTitle h1').innerHTML = this.metadatos.nombre;
      document.querySelector('.breadcrumb__lastItem span').innerHTML = this.metadatos.nombre;
      document.querySelector('.breadcrumb__lastItem').href = `${origin}${this.$route.path}`;
    },
  };
</script>
