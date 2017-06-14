// Archivo de configuración
// 
// green-fix.com

'use strict';

const paths   = require('../gulp/paths');
const argv    = require('yargs').argv;
const webSite = '_' + argv.site + '/';

var config = {};

config.deploymentMethod = 'ftp';
config.ftphost = 'green-fix.com';
config.ftppath = '/';

config.serviceWorker = {
  generar: true,
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

config.tasks = {
  buildSequence: [
    'clean',
    'assets',
    'build:site',
    'html',
    'php',
    'copy:static',
    'service-worker'
  ]
}

module.exports = config;