function addVueRouterListener() {
  Array.from(document.querySelectorAll('.js-vue-router')).forEach((el) => {
    el.addEventListener('click', (event) => {
      if (window.vueRouter) {
        event.preventDefault();
        window.vueRouter.push({ name: 'categoria', params: { slug: el.dataset.slug } });
        window.jrNavMenu.collapse();
      }
    });
  });
}

export default addVueRouterListener;
