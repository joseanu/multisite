import marked from 'marked';

export const markdown = {
  methods: {
    compilaMD(md) {
      return marked(md, { sanitize: true });
    },
  },
};

export const beforeRouteUpdate = {
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    console.log('entro acá');
    if (asyncData) {
      this.$bar.start();
      asyncData({
        store: this.$store,
        route: to,
      })
        .then(() => {
          this.$bar.finish();
          next();
        })
        .catch((error) => {
          console.error(error);
          next();
        });
    } else {
      next();
    }
  },
};
