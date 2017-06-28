'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      swPrecache  = require('sw-precache'),
      wbBuild     = require('workbox-build');

// include paths
const paths       = require('../paths');

const webSite     = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

gulp.task('service-worker', function(callback) {
  let sw_filename = 'service-worker.js';
  if (config.serviceWorker.fileName)
    sw_filename = config.serviceWorker.fileName;
  const sw_path = webSite + paths.siteFolderName + '/' + sw_filename;

  const sw_options = {
    cacheId: webSite,
    logger: gutil.log,
    navigateFallback: '/sin-red.html',
    stripPrefix: webSite + paths.siteDir
  };

  if (config.serviceWorker.staticFileGlobs)
    sw_options.staticFileGlobs = config.serviceWorker.staticFileGlobs;
  if (config.serviceWorker.runtimeCaching)
    sw_options.runtimeCaching = config.serviceWorker.runtimeCaching;

  if (argv.prod && config.serviceWorker.generar) {
    swPrecache.write(sw_path, sw_options, callback);
  }
  else {
    callback();
  }
});