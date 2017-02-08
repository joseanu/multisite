'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      size        = require('gulp-size');

// include paths
const paths        = require('../paths');

const webSite    = argv.site + '/';

// 'gulp assets:copy' -- copies assets into the /_site/ to avoid Jekyll overwriting the whole directory
gulp.task('copy:assets', () =>
  gulp.src(webSite + paths.assetFilesTemp + '/**/*')
    .pipe(gulp.dest(webSite + paths.assetFilesSite))
);

// 'gulp copy:tmp' -- copies Jekyll site to a temporary directory to be processed
gulp.task('copy:tmp', () =>
  gulp.src(webSite + paths.sourceFolderName + '/html/**/*', {dot: true})
    .pipe(gulp.dest(webSite + paths.tempDir + paths.sourceFolderName))
    .pipe(size({title: 'Jekyll'}))
);

// 'gulp copy:site' -- copies processed Jekyll site to /_site/
gulp.task('copy:site', () =>
  gulp.src(webSite + paths.tempDir + paths.siteFolderName + '/**/*', {dot: true})
    .pipe(gulp.dest(webSite + paths.siteFolderName))
);

// 'gulp copy:static' -- copia archivos de static a /_site/
gulp.task('copy:static', () =>
  gulp.src(webSite + paths.sourceFolderName + '/static/*', {dot: true})
    .pipe(gulp.dest(webSite + paths.siteFolderName))
);

// 'gulp copy:php' -- copia archivos de php a /_site/
gulp.task('copy:php', () =>
  gulp.src(webSite + paths.phpFiles + '/**/*', {dot: true})
    .pipe(gulp.dest(webSite + paths.siteFolderName + '/server'))
);


//******************************************************************************
//        PENSAR !
//******************************************************************************
//
// 'gulp copy:phplib' -- copia archivos de phplib a /_site/
gulp.task('copy:phplib', () =>
  gulp.src(paths.phplibFolderName + '/**/*')
    .pipe(gulp.dest(paths.siteDir + paths.phplibFolderName))
);