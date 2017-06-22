<template>
  <div class="wrapper productosHeader">
    <div class="productosHeader__list">
      <router-link
        class="productosHeader__listItem"
        v-for="(categoria, slug) in categorias"
        :to="{ name: 'categoria', params: { slug } }"
        :key="slug">
        <div class="productosHeader__listItem__icon">
          <svg>
            <title>{{ categoria.nombre }}</title>
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              v-bind:xlink:href="`/assets/img/svg/icons.svg#${slug}`">
            </use>
          </svg>
        </div>
        <div class="productosHeader__listItem__nombre">
          {{ categoria.nombre }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categorias() {
        return this.$store.state.categorias;
      },
    },
    mounted() {},
  };
</script>
