<template>
  <div class="producto" :id="producto.modelo">
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
        const categoria = this.$store.getters.getCategoriaBySlug(this.$route.params.slug);
        return categoria.tipos
          && categoria.tipos[this.tipo]
          && categoria.tipos[this.tipo].producto;
      },
    },
    components: {
      ProductoImagen,
    },
  };
</script>
