<template>
  <div id="categoria">
    <div
      class="contenido"
      v-if="categoria"
      v-html="compilaMD(categoria.contenido)">
    </div>
    <imagen-pastel 
      v-for="imagen in categoria.imagenes"
      :imagen="imagen"
      key="imagen.id">
    </imagen-pastel>
  </div>
</template>

<script>
  import { markdown, beforeRouteUpdate } from '../util/mixins';
  import ImagenPastel from './ImagenPastel.vue';

  export default {
    asyncData({ store, route }) {
      return store.dispatch('fetchCategoria', route.params.categoria);
    },
    data() {
      return {
        loading: true,
      };
    },
    computed: {
      categoria() {
        return this.$store.getters.getCategoriaBySlug(this.$route.params.categoria);
      },
    },
    components: {
      ImagenPastel,
    },
    mixins: [markdown, beforeRouteUpdate],
  };
</script>

<style>
#categoria {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.contenido {
	grid-column: 2 / -1; 
	grid-row: 2 / span 4;
}
</style>