<template>
  <div id="nav" class="siteHeader" v-once>
    <div class="siteHeader__section">
      <div class="siteHeader__item siteHeaderLogo">
        <router-link to="/" v-html="logo"></router-link>
      </div>
    </div>
    <div class="siteHeader__section">
      <div class="siteHeader__item siteHeaderButton">
        <router-link
          to="/">
          Inicio
        </router-link>
      </div>
      <div class="siteHeader__item siteHeaderButton">
        <router-link :to="{ name: 'sabores' }">Sabores</router-link>
      </div>
      <div class="siteHeader__item siteHeaderButton">
        <router-link :to="{ name: 'catalogo' }">Pasteles</router-link>
      </div>
      <div class="siteHeader__item siteHeaderButton">
        <router-link
          :to="{ name: 'pagina', params: { pageSlug: 'nosotros' } }">
          Nosotros
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '../../../img/svg/logo.svg';

  export default {
    data() {
      return {
        logo,
      };
    },
  };
</script>

<style>
.siteHeader {
  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: #56727C;
}

.siteHeader__section {
  display: flex;
  align-items: center;
}

.siteHeader__item {
  padding: 20px 15px;
  font-size: 12px;
}

.siteHeader__item + .siteHeader__item {
  margin-left: 5px;
}

.siteHeader__item.is-site-header-item-selected {
  color: #FFFFFF;
  background-color: #415F69;
  border-radius: 4px;
}

.siteHeaderLogo {
  padding: 0;
}

.siteHeaderLogo svg {
  width: 74px;
}

.siteHeaderButton {
  cursor: pointer;
  color: #D9E9EF;
}
</style>