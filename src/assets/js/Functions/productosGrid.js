var Flickity = require('flickity');

function $id(id) {
	return document.getElementById(id);
}

export default function() {
  let sliders = [].slice.call(document.querySelectorAll('.main-carousel')),
      flkties = [];
  sliders.forEach(function(slider) {
    let flkty = new Flickity(slider, {
      cellSelector: '.carousel-cell',
      pageDots: false,
      wrapAround: true,
      cellAlign: 'left',
      imagesLoaded: true,
      percentPosition: true,
      resize: true
    });
    flkties.push(flkty);
  });

  let filtro = $id('filtro');
  if (filtro) {
    require.ensure([], () => {
      var mixitup = require('mixitup');
      const mixer = mixitup('.productos', {
        selectors: {
          target: '.producto'
        },
        animation: {
          duration: 300
        }
      });
    }, 'mixitup');
  }
}