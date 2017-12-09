<template>
  <div class="index">
    <span>Index!</span>
    <div class="categorias">
      <div class="item" v-for="{ fields } in categoriasHome">
        <router-link :to="{ name: 'categoria', params: { categoria: fields.slug } }">
          <img :src="`${fields.imagen}?fm=jpg&fl=progressive&fit=thumb&w=250&h=250`"></img>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categoriasHome() {
        return this.$store.getters.getCategoriasHome;
      },
    },
  };
</script>

<style>
.categorias { 
  padding: .5vw;
  font-size: 0;
  display: -ms-flexbox;
  -ms-flex-wrap: wrap;
  -ms-flex-direction: column;
  -webkit-flex-flow: row wrap; 
  flex-flow: row wrap; 
  display: -webkit-box;
  display: flex;
}
.item { 
  flex: auto; 
  width: 200px; 
  margin: .5vw; 
}
.item img { 
  width: 100%; 
  height: auto; 
}
</style>