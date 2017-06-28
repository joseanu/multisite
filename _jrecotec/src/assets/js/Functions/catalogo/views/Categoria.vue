<template>
  <div class="mainProductos bab">
    <contenido></contenido>
    <div v-if="numCategorias > 0" class="productosGrid">
      <div class="wrapper">
        <div class="productos">
          <div id="filtro" class="productosNav" v-if="filtros.length > 1">
            <button type="button" class="boton blanco" @click="filtrar('todos')">Todos</button>
            <button type="button" class="boton blanco" v-for="tipo in filtros" @click="filtrar(tipo.slug)">{{ tipo.nombre }}</button>
          </div>
          <transition-group name="list" tag="div" class="productosLista">
            <template v-for="(listado, tipo) in productos">
              <producto v-for="producto in listado" :tipo="tipo" :producto="producto" :key="producto.modelo"></producto>
            </template>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Contenido from '../components/Contenido.vue';
  import Producto from '../components/Producto.vue';

  export default {
    data() {
      return {
        filtrado: 'todos',
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
      productos() {
        if (this.parametro) {
          return Object.keys(this.$store.state.productos[this.parametro])
            .filter((categoria) => {
              if (categoria !== 'contenidos') {
                if (this.filtrado === 'todos') {
                  return true;
                }
                return categoria === this.filtrado;
              }
              return false;
            })
            .reduce((obj, key) => {
              obj[key] = this.$store.state.productos[this.parametro][key];
              return obj;
            }, {});
        }
        return {};
      },
      filtros() {
        if (this.productos) {
          const tipos = this.$store.getters.getCategoriaBySlug(this.parametro).tipos;
          if (tipos) {
            return Object.keys(tipos).reduce((filtro, tipoSlug) => {
              if (tipos[tipoSlug] && tipos[tipoSlug].filtro) {
                filtro.push({
                  slug: tipoSlug,
                  nombre: tipos[tipoSlug].filtro,
                });
              }
              return filtro;
            }, []);
          }
        }
        return [];
      },
    },
    methods: {
      filtrar(dataGroup) {
        this.filtrado = dataGroup;
      },
    },
    components: {
      Contenido,
      Producto,
    },
  };
</script>
