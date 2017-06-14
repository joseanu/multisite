// Archivo de configuración
// 
// jrecotecnologia.com

'use strict';

const paths   = require('../gulp/paths');
const argv    = require('yargs').argv;
const webSite = '_' + argv.site + '/';

var config = {};

config.deploymentMethod = 'ftp';
config.ftphost = '66.7.195.240';
config.ftppath = '/public_html/';

config.serviceWorker = {
  generar: false,
  staticFileGlobs: [
    webSite + paths.sassFilesSite + '/**/*.css',
    webSite + paths.jsFilesSite + '/**/*.js',
    webSite + paths.imageFilesSite + '/social/logo.png',
    webSite + paths.imageFilesSite + '/svg/icons.svg',
    webSite + paths.imageFilesSite + '/header-bg.jpg',
    webSite + paths.siteFolderName + '/index.html',
    webSite + paths.siteFolderName + '/clientes/index.html',
    webSite + paths.siteFolderName + '/contacto/index.html',
    webSite + paths.siteFolderName + '/por-que-elegir-green-fix/index.html',
    webSite + paths.siteFolderName + '/servicios/index.html',
    webSite + paths.siteFolderName + '/staff/index.html',
    webSite + paths.siteFolderName + '/sin-red.html'
  ],
  runtimeCaching: [
    {
      urlPattern: '/(.+)',
      handler: 'cacheFirst',
      options: {
        origin: /https?:\/\/fonts.+/,
        cache: {
          name: 'fonts-cache'
        }
      }
    },
    {
      urlPattern: '/assets/img/(.*)',
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 25,
          name: 'images-cache'
        }
      }
    }
  ]
}

config.resizeImgDir = ['productos', 'sucursales'];

config.resizeSizes = [
  { width: 25, upscale: false },
  { width: 200, upscale: false },
  { width: 300, upscale: false },
  { width: 400, upscale: false },
  { width: 600, upscale: false },
  { width: 800, upscale: false },
];

config.tasks = {
  buildSite: [
    'copy:tmp',
    'inject',
    'site',
    'copy:site',
  ],
  buildSequence: [
    'clean',
    'assets',
    'imgProductos',
    'build:site',
    'build:catalogo',
    'genera:catalogo',
    'html',
    'php',
    'copy:static',
    'inject:htaccess',
    'inject:trabajador',
  ],
  watcher: 'watch:jr',
};

module.exports = config;