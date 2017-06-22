<template>
  <div class="mainProductos">
    <div class="productosNav" v-if="Object.keys(contenidos).length > 0">
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
      <div v-if="contenidoIndex" v-html="contenidos.index.body"></div>
    </transition>
    <transition name="move" mode="out-in">
      <router-view key="key"></router-view>
    </transition>
    <div v-if="numCategorias > 0" class="productosGrid">
      <div class="wrapper">
        <div class="productos">
          <div id="filtro" class="productosNav" v-if="filtro.length > 1">
            <button type="button" class="boton blanco" @click="filtrar('all')">Todos</button>
            <button type="button" class="boton blanco" v-for="tipo in filtro" @click="filtrar(tipo.slug)">{{ tipo.nombre }}</button>
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
    data() {
      return {
        visibles: {},
      };
    },
    computed: {
      parametro() {
        return this.$route.params.slug;
      },
      numCategorias() {
        if (this.parametro) {
          return Object.keys(this.$store.state.productos[this.parametro]).filter(
            cat => cat !== 'contenidos',
          ).length;
        }
        return 0;
      },
      contenidos() {
        if (this.parametro) {
          return this.$store.state.productos[this.parametro].contenidos || {};
        }
        return {};
      },
      contenidoIndex() {
        if (this.$route.name === 'categoria' && this.contenidos.index) {
          return true;
        }
        return false;
      },
      productos() {
        if (this.parametro) {
          return Object.keys(this.$store.state.productos[this.parametro])
            .filter(cat => cat !== 'contenidos')
            .reduce((obj, key) => {
              obj[key] = this.$store.state.productos[this.parametro][key];
              return obj;
            }, {});
        }
        return {};
      },
      tipos() {
        if (this.productos) {
          return this.$store.state.categorias[this.parametro].tipos || {};
        }
        return {};
      },
      filtro() {
        if (this.tipos !== {}) {
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
      filtrar(dataGroup) {
        if (dataGroup === 'all') {
          this.visibles = this.productos;
        } else {
          this.visibles = {
            [dataGroup]: this.productos[dataGroup],
          };
        }
      },
    },
    components: {
      Producto,
    },
    mounted() {
      this.visibles = this.productos;
    },
  };
</script>
