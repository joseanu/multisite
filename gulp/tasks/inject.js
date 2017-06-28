'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      inject      = require('gulp-inject');

// include paths
const paths       = require('../paths');

const webSite     = '_' + argv.site + '/';

// 'gulp inject:css' -- injects style.css
gulp.task('inject:css', () =>
  gulp.src(webSite + paths.tempDir + paths.sourceDir + paths.includesFolderName + '/head.html')
    .pipe(inject(gulp.src(webSite + paths.sassFilesTemp + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: webSite + paths.tempFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true
    }))
    .pipe(gulp.dest(webSite + paths.tempDir + paths.sourceDir + paths.includesFolderName))
);

// 'gulp inject:scripts' -- injects index.js
gulp.task('inject:scripts', () =>
  gulp.src(webSite + paths.tempDir + paths.sourceDir + paths.includesFolderName + '/partes/scripts.html')
    .pipe(inject(gulp.src(webSite + paths.jsFilesTemp + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return '<script async src="' + filepath + '"></script>';
      },
      ignorePath: webSite + paths.tempFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true
    }))
    .pipe(gulp.dest(webSite + paths.tempDir + paths.sourceDir + paths.includesFolderName + '/partes'))
);