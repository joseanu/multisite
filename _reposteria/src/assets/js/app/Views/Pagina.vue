<template>
  <div id="page">
    <div
      class="contenido"
      v-if="pagina"
      v-html="compilaMD(pagina.contenido)">
    </div>
  </div>
</template>

<script>
  import { markdown, beforeRouteUpdate } from '../util/mixins';

  export default {
    asyncData({ store, route }) {
      return store.dispatch('fetchPage', route.params.pageSlug);
    },
    data() {
      return {
        loading: true,
      };
    },
    computed: {
      pagina() {
        return this.$store.getters.getPageBySlug(this.$route.params.pageSlug);
      },
    },
    components: {},
    mixins: [markdown, beforeRouteUpdate],
  };
</script>
