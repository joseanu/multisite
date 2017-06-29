<template>
  <div class="productosHeader__list">
    <template v-for="{ slug, nombre } in categorias">
    <router-link
      v-if="slug !== 'index'"
      class="productosHeader__listItem"
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
    </template>
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