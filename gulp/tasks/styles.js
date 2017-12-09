'use strict';
const argv          = require('yargs').argv,
      gulp          = require('gulp'),
      when          = require('gulp-if'),
      sourcemaps    = require('gulp-sourcemaps'),
      sass          = require('gulp-sass'),
      sassImport    = require('sass-module-importer'),
      postcss       = require('gulp-postcss'),
      autoprefixer  = require('autoprefixer'),
      size          = require('gulp-size'),
      rename        = require('gulp-rename'),
      cssnano       = require('gulp-cssnano'),
      rev           = require('gulp-rev'),
      gulpStylelint = require('gulp-stylelint');

// include paths
const paths         = require('../paths');

const webSite       = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes, minifies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('styles', () => {
  return gulp.src(webSite + paths.sassFiles + '/main.scss')
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      importer: sassImport(),
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['> 0.5%']
      }),
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.css', cssnano({
      autoprefixer: false,
      svgo: false
    }))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest(webSite + paths.sassFilesTemp)))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest(webSite + paths.sassFilesTemp));
  }
);

gulp.task('lint-css', function lintCssTask() {
  return gulp
    .src(webSite + paths.sassFiles + '/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});