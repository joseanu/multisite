<template>
  <div class="producto">
    <div class="productoInner">
      <producto-imagen
        :altText="`${producto.marca} ${producto.modelo}`"
        :tipo="tipo"
        :modelo="producto.modelo">
      </producto-imagen>
      <div class="productoInner__nombre">
        <h2>
          <span v-if="tipoProducto">
            {{ tipoProducto }} 
          </span>
          {{ producto.marca }}
          <br>
          {{ producto.modelo }}
        </h2>
      </div>
      <div class="productoInner__descripcion">
        <p>{{ producto.caracteristicas }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductoImagen from './ProductoImagen.vue';

  export default {
    props: {
      producto: Object,
      tipo: String,
    },
    computed: {
      tipoProducto() {
        return this.$store.state.categorias[this.$route.params.slug].tipos
          && this.$store.state.categorias[this.$route.params.slug].tipos[this.tipo]
          && this.$store.state.categorias[this.$route.params.slug].tipos[this.tipo].producto;
      },
    },
    components: {
      ProductoImagen,
    },
  };
</script>
