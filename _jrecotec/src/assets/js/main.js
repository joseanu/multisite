import 'es6-promise/auto';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes';
import svg4everybody from 'svg4everybody';
import isMobile from 'ismobilejs';
import { DOMUtil } from './util';
import initSelectSucursal from './topbar';
import linkeaTelefonos from './telefonos';
import atencionClientes from './atencion';
import addVueRouterListener from './vueRouter';
import Functions from './Functions/index';

import Menu from './menu';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;
window.lazySizesConfig.loadMode = 1;
window.lazySizesConfig.expand = 222;
window.lazySizesConfig.expFactor = 1.6;

function domIsReady() {
  window.lazySizes.init();
  svg4everybody();

  if (window.matchMedia('(max-width: 768px)').matches) {
    window.jrNavMenu = new Menu();
  }
  initSelectSucursal();
  atencionClientes();
  addVueRouterListener();
  if (isMobile.phone) linkeaTelefonos();

  // Load the function based on the body tag data-function=""
  const func = DOMUtil.getFunctionName(document.body.attributes);
  if (func !== undefined) {
    func.forEach((funcion) => {
      if (Functions[funcion] !== undefined) {
        Functions[funcion]();
      }
    });
  }

  if (window.location.hostname === 'www.jrecotecnologia.com') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/trabajador.js', {
        scope: '/',
      });
    }
  }
}

DOMUtil.ready(domIsReady);
