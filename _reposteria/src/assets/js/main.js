import 'es6-promise/auto';

import svg4everybody from 'svg4everybody';
import isMobile from 'ismobilejs';

import { DOMUtil } from './util';

import lazySizes from './global/lazysizes';
import linkeaTelefonos from './global/telefonos';

import Functions from './Functions/index';

function domIsReady() {
  lazySizes.init();
  svg4everybody();

  if (isMobile.phone) linkeaTelefonos();

  const func = DOMUtil.getFunctionName(document.body.attributes);
  if (func !== undefined) {
    func.forEach((fn) => {
      if (Functions[fn] !== undefined) {
        Functions[fn]();
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
