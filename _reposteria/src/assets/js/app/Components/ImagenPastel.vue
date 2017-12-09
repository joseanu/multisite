<template>
  <div class='box'>
    <img
      :src="`${imagen.url}?fm=jpg&fl=progressive&fit=thumb&w=200&h=200`"
      :alt="imagen.titulo">
    <div class='text'>
      <div>
        <span class='innertext'>{{ imagen.titulo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      imagen: Object,
    },
  };
</script>

<style lang="scss">
.box img {
  border-radius: 50%;
  box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.6);
}
</style>
