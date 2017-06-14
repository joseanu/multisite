<template>
  <div v-if="parametro === undefined">
    Indice
  </div>
  <div v-else class="productosGrid">
    <div class="wrapper">
      <div class="productos">
        <div id="filtro" class="productosFiltro" v-if="filtro.length > 1">
          <button type="button" @click="filtrar('all')">Todos</button>
          <button type="button" v-for="tipo in filtro" @click="filtrar(tipo.slug)">{{ tipo.nombre }}</button>
        </div>
        <transition-group name="list" tag="div" class="productosLista">
          <template v-for="(productos, tipo) in visibles">
            <producto v-for="producto in productos" :tipo="tipo" :producto="producto" :key="producto.modelo"></producto>
          </template>
        </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import imagesLoaded from 'imagesloaded';
  import Producto from '../components/Producto.vue';

  export default {
    title() {
      if (this.parametro) {
        return this.$store.state.categorias[this.parametro].nombre;
      }
      return 'Catálogo de Ecotecnologías';
    },
    data() {
      return {
        visibles: {},
      };
    },
    computed: {
      parametro() {
        return this.$route.params.slug;
      },
      categoria() {
        if (this.parametro) {
          return this.$store.state.productos[this.$route.params.slug];
        }
        return {};
      },
      tipos() {
        if (this.categoria) {
          return this.$store.state.categorias[this.$route.params.slug].tipos || {};
        }
        return {};
      },
      filtro() {
        if (this.tipos) {
          return Object.keys(this.tipos).reduce((filtro, tipoSlug) => {
            if (this.tipos[tipoSlug] && this.tipos[tipoSlug].filtro) {
              filtro.push({
                slug: tipoSlug,
                nombre: this.tipos[tipoSlug].filtro,
              });
            }
            return filtro;
          }, []);
        }
        return [];
      },
    },
    methods: {
      filtrar2(dataGroup) {
        this.$shuffle.filter(dataGroup);
      },
      filtrar(dataGroup) {
        if (dataGroup === 'all') {
          this.visibles = this.categoria;
        } else {
          this.visibles = {
            [dataGroup]: this.categoria[dataGroup],
          };
        }
      },
    },
    components: {
      Producto,
    },
    mounted() {
      this.visibles = this.categoria;
      // function iniciarShuffle(Shuffle) {
      //   this.$shuffle = new Shuffle(this.$el.querySelector('#grid'), {
      //     itemSelector: '.producto',
      //     useTransforms: true,
      //   });
      //   imagesLoaded(this.$el, () => {
      //     this.$shuffle.layout();
      //   });
      // }
      // if (this.parametro) {
      //   import(/* webpackChunkName: "shuffle" */ 'shufflejs').then(iniciarShuffle.bind(this));
      // }
    },
  };
</script>

<style>
  .list-enter-active, .list-leave-active, .list-move {
    transition: all 0.3s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
