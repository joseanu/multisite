// Archivo de configuración
// 
// quintosolar.com

'use strict';
var config = {};

config.vendor =   ['./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js',
                  './node_modules/lazysizes/lazysizes.js'];
config.chartist = ['./node_modules/chartist/dist/chartist.min.js',
                  './node_modules/chartist-plugin-axistitle/dist/chartist-plugin-axistitle.min.js',
                  './node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js',
                  './node_modules/chartist-plugin-legend/chartist-plugin-legend.js'];

config.deploymentMethod = 'firebase';

config.resizeImgDir = ['blog'];

config.resizeSizes = [
  { width: 20, upscale: false },
  { width: 320, upscale: false },
  { width: 768, upscale: false },
  { width: 1024, upscale: false },
  { width: 1600, upscale: true }
]

config.webpackEntry = {
  app: './app',
  vue_app: './vue_app'
}

module.exports = config;