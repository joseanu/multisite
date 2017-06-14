<template>
  <div id="map"></div>
</template>

<script>
  import loadGoogleMapsAPI from 'load-google-maps-api'; // https://github.com/yuanqing/load-google-maps-api
  
  export default {
    mounted() {
      loadGoogleMapsAPI({
        key: 'AIzaSyBHiby2iDfJtKe73ttJ9LSr7lj0-Ui5gJw',
        language: 'es'
      }).then((googleMaps) => {
        this.crearMapa();
      }).catch((err) => {
        console.error(err);
      });
    },
    methods: {
      crearMapa() {
        this.mapObject = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 23.919722, lng: -102.162500},
          zoom: 4
        });
        this.mapMarker = new google.maps.Marker({
          position: new google.maps.LatLng(23.919722, -102.162500),
          draggable: true
        });
        google.maps.event.addListener(this.mapMarker, 'dragend', this.posicionNueva);
        this.mapMarker.setMap(this.mapObject);
      },
      posicionNueva(evt) {
        const vm = this;
        this.$emit('cambioPosicion', {
          latitud: vm.mapMarker.position.lat(),
          longitud: vm.mapMarker.position.lng()
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  #map {
    margin: 25px;
    border: 1px solid #000;
    height: 270px;
  }
</style>