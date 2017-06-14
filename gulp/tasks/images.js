'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      when        = require('gulp-if'),
      cheerio     = require('gulp-cheerio'),
      imagemin    = require('gulp-imagemin'),
      newer       = require('gulp-newer'),
      size        = require('gulp-size'),
      rename      = require('gulp-rename'),
      resize      = require('./resize-images'),
      svgmin      = require('gulp-svgmin'),
      svgstore    = require('gulp-svgstore'),
      merge2      = require('merge2');

// include paths file
const paths       = require('../paths');

const webSite     = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

var imagePaths = [
  webSite + paths.imageFilesGlob,
  '!' + webSite + paths.imageFiles + '/{svg,svg/**}'
];

var responsive = false;

if (config.resizeImgDir) {
  responsive = true;
  config.resizeImgDir.forEach(function responsivePaths(currentPath) {
    imagePaths.push('!' + webSite + paths.imageFiles + '/{' + currentPath + ',' + currentPath + '/**}');
  });
}

// 'gulp images:noresize' -- optimizes images
gulp.task('images:noresize', () => 
  gulp.src( imagePaths )
    .pipe(newer(webSite + paths.imageFilesSite))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng()
    ], {verbose: true}))
    .pipe(gulp.dest(webSite + paths.imageFilesSite))
    .pipe(size({title: 'images'}))
);

// Image resize values
const responsiveSizes = config.resizeSizes || [
  { width: 25, upscale: false },
  { width: 200, upscale: false },
  { width: 300, upscale: false },
  { width: 400, upscale: false },
  { width: 600, upscale: false },
  { width: 800, upscale: false }
];

// 'gulp images:responsive' -- resizes, optimizes, and caches responsive images
// https://gist.github.com/ddprrt/1b535c30374158837df89c0e7f65bcfc
gulp.task('images:responsive', function(done) {
  if (responsive) {
    var streams = responsiveSizes.map(function(tamano) {
      return config.resizeImgDir.map(function(currentPath) {
        return gulp.src(webSite + paths.imageFiles + '/' + currentPath + paths.imagePattern)
          .pipe(rename(function(file) {
            if(file.extname) {
              file.basename += '-' + tamano.width;
            }
          }))
          .pipe(newer(webSite + paths.imageFilesSite + '/' + currentPath))
          .pipe(resize(tamano))
          .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng()
          ], {verbose: true}))
          .pipe(gulp.dest(webSite + paths.imageFilesSite + '/' + currentPath));
      });
    });
    streams = [].concat.apply([], streams);
    return merge2(streams);
  }
  done();
});

gulp.task('icons', function () {
  return gulp.src(webSite + paths.iconFiles + '/**/*.svg')
    .pipe(svgmin({
        plugins: [{
          cleanupIDs: false
        }]
      }))
    .pipe(svgstore({ inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').attr('style', 'display:none');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(webSite + paths.imageFiles + '/svg/'));
});

gulp.task('images:svg', () =>
  gulp.src(webSite + paths.imageFiles + '/svg/**/*')
    .pipe(gulp.dest(webSite + paths.imageFilesSite + '/svg'))
);