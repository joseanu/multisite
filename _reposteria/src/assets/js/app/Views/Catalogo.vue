<template>
  <div id="catalogo">
    Catalogo
    <input type="text" v-model="busqueda"/>
    <button type="submit" @click="buscar">Buscar</button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        busqueda: '',
      };
    },
    methods: {
      buscar() {
        this.$router.push({ name: 'buscar', params: { busqueda: this.busqueda } });
      },
    },
  };
</script>