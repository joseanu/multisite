'use strict';
const argv       = require('yargs').argv,
      gulp       = require('gulp'),
      htmlmin    = require('gulp-htmlmin'),
      size       = require('gulp-size'),
      when       = require('gulp-if'),
      typogr     = require('gulp-typogr');

// include paths file
const paths      = require('../paths');

const webSite    = '_' + argv.site + '/';

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task('html', () =>
  gulp.src(webSite + paths.siteFolderName + paths.htmlPattern)
    .pipe(when(argv.prod, typogr({
      only: ['widont', 'smartypants']
    })))
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      keepClosingSlash: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized HTML'})))
    .pipe(gulp.dest(webSite + paths.siteFolderName))
);