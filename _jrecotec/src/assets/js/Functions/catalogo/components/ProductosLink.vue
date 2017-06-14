<template>
  <div class="wrapper productos__Header">
    <div class="productos__Header__list">
      <router-link
        class="productos__Header__listItem"
        v-for="(categoria, slug) in categorias"
        :to="{ name: 'categoria', params: { slug }}"
        :key="slug">
        <div class="productos__Header__listItem__icon">
          <svg>
            <title>{{ categoria.nombre }}</title>
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              v-bind:xlink:href="`/assets/img/svg/icons.svg#${slug}`">
            </use>
          </svg>
        </div>
        <div class="productos__Header__listItem__nombre">
          {{ categoria.nombre }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categorias() {
        return this.$store.state.categorias;
      },
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  .productos__Header {
    margin-bottom: 1.66667rem;
  }

  .productos__Header__list {
    display: flex;
  }

  .productos__Header__listItem {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    padding: 1.66667rem * 2 0;
    border-radius: 3px;
  }

  .productos__Header__listItem:hover {
    background-color: #f6f6f6;
    box-shadow: inset 0 0 1px #828282;
  }

  .productos__Header__listItem.activo {
    background-color: #f6f6f6;
    box-shadow: inset 0 1px 1px #828282;
  }

  .productosHeader__listItem__icon {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

  svg {
    width: 4rem;
    height: 4rem;
    display: inline-block;
    background-color: #44ac64;
    border-radius: 2rem;
    fill: #fff;
  }
</style>
