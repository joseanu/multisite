'use strict';
var argv       = require('yargs').argv;
var gulp       = require('gulp');
var htmlmin    = require('gulp-htmlmin');
var size       = require('gulp-size');
var when       = require('gulp-if');
var typogr     = require('gulp-typogr');

// include paths file
var paths      = require('../paths');

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task('html', () =>
  gulp.src(paths.siteFolderName + paths.htmlPattern)
    .pipe(typogr({
      only: ['widont', 'smartypants']
    }))
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, size({title: 'optimized HTML'})))
    .pipe(gulp.dest(paths.siteFolderName))
);