<template>
  <div id="buscar">
    <template v-for="imagen in resultados">
        <img
          :src="`${imagen.url}?fm=jpg&fl=progressive&fit=thumb&w=150&h=57`"
          :alt="imagen.titulo">	
    </template>
  </div>
</template>

<script>
  export default {
    asyncData({ store, route }) {
      return store.dispatch('buscarImagenes', route.params.busqueda);
    },
    data() {
      return {
        loading: true,
      };
    },
    computed: {
      resultados() {
        return this.$store.getters.getResultados(this.$route.params.busqueda);
      },
    },
    components: {},
  };
</script>
