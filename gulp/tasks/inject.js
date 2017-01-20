'use strict';
var gulp   = require('gulp');
var inject = require('gulp-inject');

// include paths file
var paths  = require('../paths');

// 'gulp inject:css' -- injects style.css
gulp.task('inject:css', () =>
  gulp.src(paths.tempDir + paths.sourceDir + paths.includesFolderName + '/head.html')
    .pipe(inject(gulp.src(paths.sassFilesTemp + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: paths.tempFolderName,
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.includesFolderName))
);

// 'gulp inject:scripts' -- injects index.js
gulp.task('inject:scripts', () =>
  gulp.src(paths.tempDir + paths.sourceDir + paths.includesFolderName + '/partes/scripts.html')
    .pipe(inject(gulp.src(paths.jsFilesTemp + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return '<script async src="' + filepath + '"></script>';
      },
      ignorePath: paths.tempFolderName,
      addRootSlash: false,
      addPrefix: '{{ site.url }}',
      removeTags: true
    }))
    .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.includesFolderName + '/partes'))
);

gulp.task('inject:htaccess', () =>
  gulp.src(paths.siteFolderName + '/.htaccess')
    .pipe(inject(gulp.src(paths.sassFilesSite + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'htaccess'
    }))
    .pipe(inject(gulp.src(paths.jsFilesSite + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath;
      },
      ignorePath: paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'htaccess'
    }))
    .pipe(gulp.dest(paths.siteFolderName))
);

gulp.task('inject:trabajador', () =>
  gulp.src(paths.siteFolderName + '/trabajador.js')
    .pipe(inject(gulp.src(paths.sassFilesSite + '/*.css', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'trabajador'
    }))
    .pipe(inject(gulp.src(paths.jsFilesSite + '/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return filepath;
      },
      ignorePath: paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'trabajador'
    }))
    .pipe(inject(gulp.src(paths.jsFilesSite + '/chunk/*.js', {read: false}), {
      transform: function (filepath, file, i, length) {
        return "'" + filepath + "',";
      },
      ignorePath: paths.siteFolderName,
      addRootSlash: true,
      addPrefix: '',
      removeTags: true,
      name: 'chunks'
    }))
    .pipe(gulp.dest(paths.siteFolderName))
);