<template>
  <nav class="tabbar">
    <router-link
      class="tabbar-item"
      to="/">
      Inicio
    </router-link>
    <router-link
      class="tabbar-item"
      :to="{ name: 'sabores' }">
      Sabores
    </router-link>
    <router-link
      class="tabbar-item"
      :to="{ name: 'catalogo' }">
      Pasteles
    </router-link>
    <router-link
      class="tabbar-item"
      :to="{ name: 'pagina', params: { pageSlug: 'nosotros' } }">
      Nosotros
    </router-link>
  </nav>
</template>

<script>
  export default {};
</script>

<style>
.tabbar {
  display: none;
  transition: .2s
}

@media (max-width: 767px) {
  .tabbar {
    position:fixed;
    z-index: 200;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 -2px rgba(85,49,67,0.2);
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center
  }
}

.tabbar-item {
  display: flex;
  flex: 1 1 20%;
  align-items: center;
  align-content: center;
  flex-flow: column wrap;
  padding-top: 10px;
  padding-bottom: 6px;
  color: #7f6371;
}
</style>