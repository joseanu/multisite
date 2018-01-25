import isMobile from 'ismobilejs';
import { $id, $class } from '../../util';

function animarOnMouseEnter(elemento) {
  const elTexto = $id(`t_${elemento.id}`).getComputedTextLength();
  const circulos = elemento.querySelectorAll('.circulo1, .circulo2');
  const rectangulos = elemento.querySelectorAll('.rect1, .rect2');
  const texto = elemento.querySelector('text');

  circulos[0].style.transform = `translateX(${elTexto - 13.7}px)`;
  circulos[1].style.transform = `translateX(${elTexto - 13.7}px)`;

  rectangulos[0].style.transform = `scaleX(${(elTexto - 13.7) / 2})`;
  rectangulos[1].style.transform = `scaleX(${(elTexto - 13.7) / 2})`;

  texto.style.visibility = 'visible';
  texto.style.opacity = 1;
  texto.style.transitionDelay = '0';
}

function regresarPosicion(_event) {
  if (_event.propertyName === 'opacity') {
    const hermano = this.className.baseVal.replace(' sucursal-', '').replace('suc', '');
    const nextSibling = this.parentNode.querySelectorAll(`.sucursal-${Number(hermano) + 1}`)[0];
    this.parentNode.insertBefore(this, nextSibling);
  }
}

function animarMarcadores() {
  const elementos = $class('suc', true);

  elementos.forEach((elemento) => {
    const elAnchor = elemento.getElementsByTagName('a')[0];
    const linkHref = `${document.location.origin}/sucursales/${elAnchor.attributes[0].nodeValue}/`;
    elAnchor.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', linkHref);

    elemento.addEventListener('mouseenter', () => {
      elemento.removeEventListener('transitionend', regresarPosicion.bind(elemento), false);
      elemento.parentNode.appendChild(elemento);

      animarOnMouseEnter(elemento.parentNode.lastChild);
    }, false);
    elemento.addEventListener('mouseleave', () => {
      const circulos = elemento.querySelectorAll('.circulo1, .circulo2');
      const rectangulos = elemento.querySelectorAll('.rect1, .rect2');
      const texto = elemento.querySelector('text');

      circulos[0].style.transform = 'translateX(0px)';
      circulos[1].style.transform = 'translateX(0px)';

      rectangulos[0].style.transform = 'scaleX(1)';
      rectangulos[1].style.transform = 'scaleX(1)';

      texto.style.visibility = 'hidden';
      texto.style.opacity = 0;
      texto.style.transitionDelay = '0.2s';

      elemento.addEventListener('transitionend', regresarPosicion.bind(elemento), false);
    }, false);
  });
}

export default function () {
  const ajax = new window.XMLHttpRequest();
  ajax.open('GET', '/assets/img/svg/mapaSucursales.svg', true);
  ajax.send();
  ajax.onload = () => {
    const div = document.createElement('div');
    div.innerHTML = ajax.responseText;
    $id('mapaSucursales').replaceChild(div, $id('svgMapaSucursales'));

    if (!isMobile.any) animarMarcadores();
  };
}
