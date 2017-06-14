import Flickity from 'flickity';
import { $id } from '../util';

export default function () {
  const sliders = [].slice.call(document.querySelectorAll('.main-carousel'));
  const flkties = [];
  sliders.forEach((slider) => {
    const flkty = new Flickity(slider, {
      cellSelector: '.carousel-cell',
      pageDots: false,
      wrapAround: true,
      cellAlign: 'left',
      imagesLoaded: true,
      percentPosition: true,
      resize: true,
    });
    flkties.push(flkty);
  });

  const filtro = $id('filtro');
  if (filtro) {
    require.ensure([], (require) => {
      const mixitup = require('mixitup');
      mixitup('.productos', {
        selectors: {
          target: '.producto',
        },
        animation: {
          duration: 300,
        },
      });
    }, 'mixitup');
  }
}
