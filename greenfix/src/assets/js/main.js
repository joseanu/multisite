import 'lazysizes'
import svg4everybody from 'svg4everybody'
import isMobile from 'ismobilejs'
import { DOMUtil, $class } from './util'
import linkeaTelefonos from './telefonos'
import Functions from './Functions/index'

//require('es6-promise').polyfill()

window.lazySizesConfig = window.lazySizesConfig || {}
window.lazySizesConfig.init = false

DOMUtil.ready(function () {
  if (isMobile.phone) linkeaTelefonos()

  window.lazySizes.init()
  svg4everybody()

  // Load the function based on the body tag data-function=""
  var func = DOMUtil.getFunctionName(document.body.attributes)
  if (func !== undefined) {
    func.forEach(function (funcion) {
      if (Functions[funcion] !== undefined) {
        Functions[funcion]()
      }
    })
  }

  $class('siteHeader__menuPrincipal__toggle').addEventListener('click', function() {
    $class('siteHeader__menuPrincipal').classList.toggle('activo')
  })

/*
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/trabajador.js', {
      scope: '/'
    });
  }
*/

});