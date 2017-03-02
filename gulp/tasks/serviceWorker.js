'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      swPrecache  = require('sw-precache');

// include paths
const paths       = require('../paths');

const webSite     = argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

gulp.task('service-worker', function(callback) {
  swPrecache.write(webSite + paths.siteFolderName + '/service-worker.js', {
    //1
    staticFileGlobs: [
       webSite + paths.sassFilesSite + '/**/*.css',
       webSite + paths.jsFilesSite + '/**/*.js',
       webSite + paths.siteFolderName + '/index.html',
       webSite + paths.imageFilesSite + '/**/*.{svg,png,jpg,gif}'
     ],
    // 2
//    importScripts: [
//       'app/node_modules/sw-toolbox/sw-toolbox.js',
//       'app/js/toolbox-script.js'
//     ],
    // 3
    stripPrefix: webSite + paths.siteDir
  }, callback);
});