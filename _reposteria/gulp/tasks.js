'use strict';
const argv          = require('yargs').argv,
      gulp          = require('gulp'),
      inject        = require('gulp-inject'),
      shell         = require('shelljs'),
      svgmin        = require('gulp-svgmin'),
      cheerio       = require('gulp-cheerio'),
      rename        = require('gulp-rename'),
      mapDir        = require("gulp-directory-map"),
      path          = require('path'),
      webpack       = require('webpack'),
      nodeExternals = require('webpack-node-externals'),
      VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const paths       = require('../../gulp/paths');

const webSite     = '_' + argv.site + '/';

gulp.task('inject:htaccess', () =>
  gulp.src(webSite + paths.siteFolderName + '/.htaccess')
    .pipe(inject(gulp.src(webSite + paths.sassFilesSite + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: webSite + paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'htaccess'
    }))
    .pipe(inject(gulp.src(webSite + paths.jsFilesSite + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath;
      },
      ignorePath: webSite + paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'htaccess'
    }))
    .pipe(gulp.dest(webSite + paths.siteFolderName))
);

gulp.task('inject:trabajador', () =>
  gulp.src(webSite + paths.siteFolderName + '/trabajador.js')
    .pipe(inject(gulp.src(webSite + paths.sassFilesSite + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: webSite + paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'trabajador'
    }))
    .pipe(inject(gulp.src(webSite + paths.jsFilesSite + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath;
      },
      ignorePath: webSite + paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'trabajador'
    }))
    .pipe(inject(gulp.src(webSite + paths.jsFilesSite + '/chunk/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return "'" + filepath + "',";
      },
      ignorePath: webSite + paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'chunks'
    }))
    .pipe(gulp.dest(webSite + paths.siteFolderName))
);
