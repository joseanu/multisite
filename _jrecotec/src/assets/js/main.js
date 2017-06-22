import 'es6-promise/auto';

import svg4everybody from 'svg4everybody';
import isMobile from 'ismobilejs';

import { DOMUtil } from './util';

import atencionClientes from './globales/atencion';
import lazySizes from './globales/lazysizes';
import Menu from './globales/menu';
import linkeaTelefonos from './globales/telefonos';
import initSelectSucursal from './globales/topbar';
import addVueRouterListener from './globales/vueRouter';

import Functions from './Functions/index';

function domIsReady() {
  lazySizes.init();
  svg4everybody();

  window.jrNavMenu = new Menu();
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
