import { $id } from '../../util';

// Basado en https://gist.github.com/alojzije/11127839

// Funciones auxiliares

function signum(x) {
  return (x < 0) ? -1 : 1;
}

function absolute(x) {
  return (x < 0) ? -x : x;
}

// Para evitar JQuery
function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function offset(elem) {
  let box = {
    top: 0,
    left: 0,
  };
  const doc = elem && elem.ownerDocument;
  const docElem = doc.documentElement;
  const win = getWindow(doc);

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }

  return {
    top: (box.top + win.pageYOffset) - docElem.clientTop,
    left: (box.left + win.pageXOffset) - docElem.clientLeft,
  };
}

// ¡Dibujar!
function dibujaConector(svg, path, startX, startY, endX, endY) {
  const deltaX = (endX - startX) * 0.15;
  const deltaY = (endY - startY) * 0.15;
  // Tomar la distancia más corta como Delta
  const delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

  // Establecer dirección del arco (contra/reloj)
  let arc1 = 0;
  let arc2 = 1;
  if (startX > endX) {
    arc1 = 1;
    arc2 = 0;
  }
  // Dibujar la línea
  // 1. hacia abajo, 2. arco,  3. a un lado, 4.arco, 5. hacia abajo
  path.setAttribute('d', `M${startX} ${startY} \
V${startY + delta} \
A${delta} ${delta} 0 0 ${arc1} ${startX + (delta * signum(deltaX))} ${startY + (2 * delta)} \
H${endX - (delta * signum(deltaX))} \
A${delta} ${delta} 0 0 ${arc2} ${endX} ${startY + (3 * delta)} \
V${endY}`);
}

function conectaElementos(svg, path, startElem, endElem, porX, porY) {
  const svgContainer = $id('svgConectores');
  // Obtener coordenadas del contenedor
  const svgTop = offset(svgContainer).top;
  const svgLeft = offset(svgContainer).left;

  let elInicial = startElem;
  let elFinal = endElem;

  // Poner como inicial al que esté más alto
  if (offset(startElem).top > (offset(endElem).top + (porY * endElem.offsetHeight))) {
    elInicial = endElem;
    elFinal = startElem;
  }

  // Obtener coordenadas de ambos elementos
  const startCoord = offset(elInicial);
  const endCoord = offset(elFinal);

  // Calcular coordenadas del inicio
  const startX = (startCoord.left + (0.5 * elInicial.offsetWidth)) - svgLeft;
  const startY = (startCoord.top + elInicial.offsetHeight) - svgTop;

  // Calcular coordenadas del final
  const endX = (endCoord.left + (porX * elFinal.offsetWidth)) - svgLeft;
  const endY = (endCoord.top + (porY * elFinal.offsetHeight)) - svgTop;

  // ¡dibujar!
  dibujaConector(svg, path, startX, startY, endX, endY);
}

function connectAll() {
  const svg01 = $id('svg01');

  if ((svg01 != null) && window.matchMedia('(min-width: 520px)').matches) {
    const planetaCiudad = $id('planeta-ciudad');

    conectaElementos(svg01, $id('path01'), $id('svgEnergia'), planetaCiudad, 0.4045, 0.3560);
    conectaElementos(svg01, $id('path02'), $id('svgCalentador'), planetaCiudad, 0.5892, 0.3102);
    conectaElementos(svg01, $id('path03'), $id('svgBlanca'), planetaCiudad, 0.2902, 0.3899);
    conectaElementos(svg01, $id('path04'), $id('svgAire'), planetaCiudad, 0.3517, 0.4516);
    conectaElementos(svg01, $id('path05'), $id('svgImper'), planetaCiudad, 0.6578, 0.3747);
    conectaElementos(svg01, $id('path06'), $id('svgLed'), planetaCiudad, 0.1953, 0.3809);
    conectaElementos(svg01, $id('path07'), $id('svgAgua'), planetaCiudad, 0.7457, 0.4251);
  }
}

export default connectAll;
