<template>
  <div class="productosHeader__list">
    <router-link
      class="productosHeader__listItem"
      v-for="{ slug, nombre } in categorias"
      :to="{ name: 'categoria', params: { slug } }"
      :key="slug">
      <div class="productosHeader__listItem__icon">
        <svg>
          <title>{{ nombre }}</title>
          <use :xlink:href="`/assets/img/svg/icons.svg#${slug}`"></use>
        </svg>
      </div>
      <div class="productosHeader__listItem__nombre">
        {{ nombre }}
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      categorias() {
        return this.$store.getters.getCategorias;
      },
    },
  };
</script>