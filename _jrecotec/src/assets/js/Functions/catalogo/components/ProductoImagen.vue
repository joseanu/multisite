<template>
  <div v-if="this.imagenes.length > 0" class="productoImagen intrinsic">
    <figure class="intrinsic-item" :class="figureClass">
      <img v-for="imagen in imagenes"
        :src="imageSize(imagen, 300)"
        :srcset="imageSrcSet(imagen)"
        data-sizes="auto"
        :data-srcset="dataSrcSet(imagen)"
        :alt="altText"
        class="lazyload blur-up"
        :class="imageClass">
    </figure>
  </div>
</template>

<script>
  export default {
    props: {
      altText: String,
      tipo: String,
      modelo: String,
    },
    data() {
      return {
        sizes: [
          300,
          200,
          400,
          600,
          800,
        ],
      };
    },
    computed: {
      imagenes() {
        const img =
          (this.$store.getters.getImagenesBySlug(this.$route.params.slug) &&
            this.$store.getters.getImagenesBySlug(this.$route.params.slug)[this.tipo]) ||
          this.$store.getters.getImagenesBySlug(this.$route.params.slug);

        if (!img) {
          return [];
        }
        return Object.keys(img)
          .filter(el => el.indexOf(this.modelo) > -1)
          .map(
            key =>
              `/assets/img/productos/${img[key]}`,
          );
      },
      figureClass() {
        return (this.imagenes.length > 1)
          ? 'main-carousel'
          : false;
      },
      imageClass() {
        return (this.imagenes.length > 1)
          ? 'carousel-cell'
          : false;
      },
    },
    methods: {
      imageSize(imagen, size) {
        return imagen.replace(/\.(jpg|png|svg|gif)$/g, `-${size}$&`);
      },
      imageSrcSet(imagen) {
        return this.imageSize(imagen, 25);
      },
      dataSrcSet(imagen) {
        return this.sizes.map(size => `${this.imageSize(imagen, size)} ${size}w`).join();
      },
      crearFlickity(Flickity) {
        const vm = this;
        vm.$flkty = new Flickity(vm.$el.querySelector('.main-carousel'), {
          cellSelector: '.carousel-cell',
          pageDots: false,
          wrapAround: true,
          cellAlign: 'center',
          setGallerySize: false,
          imagesLoaded: true,
          dragThreshold: 6,
        });
      },
      iniciarFlickity() {
        const vm = this;
        if (vm.imagenes.length > 1) {
          import(/* webpackChunkName: "flickity" */ 'flickity-imagesloaded')
            .then(vm.crearFlickity);
        }
      },
    },
    mounted() {
      if (!this.$flkty) {
        this.iniciarFlickity();
      }
    },
    beforeDestroy() {},
    destroyed() {},
  };
</script>

<style>
  .flickity-viewport {
    touch-action: pan-y !important;
  }
</style>
