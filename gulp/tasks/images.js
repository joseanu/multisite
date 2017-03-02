'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
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

const webSite     = argv.site + '/';

// 'gulp images:noresize' -- optimizes images
gulp.task('images:noresize', () => 
  gulp.src([
      webSite + paths.imageFilesGlob,
      '!' + webSite + paths.imageFiles + '/{responsive,responsive/**}',
      '!' + webSite + paths.imageFiles + '/{svg,svg/**}'
    ])
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
const responsiveSizes = [
  { width: 25, upscale: false },
  { width: 200, upscale: false },
  { width: 300, upscale: false },
  { width: 400, upscale: false },
  { width: 600, upscale: false },
  { width: 800, upscale: false }
];

// 'gulp images:responsive' -- resizes, optimizes, and caches responsive images
// https://gist.github.com/ddprrt/1b535c30374158837df89c0e7f65bcfc
gulp.task('images:responsive', function() {
  var streams = responsiveSizes.map(function(el) {
    return gulp.src(webSite + paths.imageFiles + '/responsive' + paths.imagePattern)
      .pipe(rename(function(file) {
        if(file.extname) {
          if(el.width == 25) {
            file.basename = 'lqip-' + file.basename;
          } else {
            file.basename += '-' + el.width;
          }
        }
      }))
      .pipe(newer(webSite + paths.imageFilesSite + '/responsive'))
      .pipe(resize(el))
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng()
      ], {verbose: true}))
      .pipe(gulp.dest(webSite + paths.imageFilesSite + '/responsive'));
  });
  return merge2(streams);
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