<template>
  <div class="contenido_catalogo">
    <div class="productosNav" v-if="cantidadContenidos > 1">
      <template v-for="(contenido, ruta) in contenidos">
        <router-link
          class="boton blanco"
          v-if="ruta === 'index' && contenido.nombre"
          :to="{ name: 'categoria', params: { slug: parametro }  }" exact>
          {{ contenido.nombre }}
        </router-link>
        <router-link
          class="boton blanco"
          v-else-if="contenido.nombre"
          :to="{ name: ruta }" exact>
          {{ contenido.nombre }}
        </router-link>
      </template>
    </div>
    <transition name="list">
      <div v-if="contenidoBody" v-html="contenidoBody"></div>
    </transition>
    <transition name="move" mode="out-in">
      <router-view key="key"></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    computed: {
      parametro() {
        if (this.$route.params.slug) {
          return this.$route.params.slug;
        }
        return 'index';
      },
      contenidos() {
        return this.$store.getters.getContenidosBySlug(this.parametro);
      },
      cantidadContenidos() {
        return Object.keys(this.contenidos).length;
      },
      contenidoBody() {
        if (
          (this.$route.name === 'index' || this.$route.name === 'categoria') &&
          this.contenidos.index
        ) {
          return this.contenidos.index.body || false;
        }
        if (this.contenidos[this.$route.name]) {
          return this.contenidos[this.$route.name].body || false;
        }
        return false;
      },
    },
  };
</script>
