'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      size        = require('gulp-size');

// include paths
const paths        = require('../paths');

const webSite    = '_' + argv.site + '/';

// 'gulp copy:php' -- copia archivos de php a /_site/
gulp.task('copy:php', () =>
  gulp.src(webSite + paths.phpFiles + '/**/*', {dot: true})
    .pipe(gulp.dest(webSite + paths.siteFolderName + '/server'))
);

// 'gulp copy:phplib' -- copia archivos de phplib a /_site/
gulp.task('copy:phplib', () =>
  gulp.src(webSite + paths.phplibFolderName + '/**/*')
    .pipe(gulp.dest(webSite + paths.siteDir + paths.phplibFolderName))
);