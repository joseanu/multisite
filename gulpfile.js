const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const gutil = require('gulp-util');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const responsive = require('gulp-responsive');
const rename = require('gulp-rename');
const purify = require('gulp-purifycss');
//const changed = require('gulp-changed');

const siteRoot = '_site';


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('jekyll', () => {
    const jekyll = child.spawn('bundle', ['exec',
        'jekyll',
        'build',
        '--watch',
        '--incremental',
        '--config',
        '_config.yml,_config.dev.yml'
    ]);

    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
    browserSync.init({
        files: [siteRoot + '/**'],
        host: process.env.IP,
        port: process.env.PORT,
        ui: { port: 8081 },
        server: {
            baseDir: siteRoot
        }
    });
});

gulp.task('servir', ['jekyll', 'serve']);



gulp.task('iconos', function () {
  return gulp.src('./src/assets/icons/*')
    .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        }))
    .pipe(svgstore({ inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').addClass('hide');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest('./_assets/images/'));
});


gulp.task('productos', function () {
  return gulp.src('./src/assets/productos/*')
    .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        }))
    .pipe(svgstore({ inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').addClass('hide');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename('iconos-productos.svg'))
    .pipe(gulp.dest('./_assets/images/productos/'));
});


gulp.task('mapa', function () {
  const genMapa = child.spawn('node', ['./src/assets/mapa/mapa-home.js']);
  genMapa.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    
    if (code == 0) {
      return gulp.src('./src/assets/mapa/mapa-sucursales.svg')
        .pipe(svgmin({
              plugins: [{
                  cleanupIDs: false
                }, {
                  collapseGroups: false
                }, {
                  mergePaths: false
                }]
      //        , js2svg: {
      //          pretty: true
      //        }
          }))
        .pipe(cheerio({
              run: function ($, file) {
                $('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
              },
              parserOptions: { xmlMode: true }
          }))
        .pipe(rename('mapaSucursales.svg'))
        .pipe(gulp.dest('./_assets/images/productos/'));
    }
  });

});

const IMG_SRC = './src/assets/img_sucursales/*.jpg';
const IMG_DEST = './_assets/images/sucursales/';

gulp.task('images', function () {
  return gulp.src(IMG_SRC)
//    .pipe(changed(IMG_DEST))
    .pipe(responsive({
      '*.jpg': [{
        width: 200,
        rename: {
          suffix: '-200px'
        }
      },{
        width: 300,
        rename: {
          suffix: '-300px'
        }
      },{
        width: 400,
        rename: {
          suffix: '-400px'
        }
      },{
        width: 600,
        rename: {
          suffix: '-600px'
        }
      },{
        width: 800,
        rename: {
          suffix: '-800px'
        },
        withoutEnlargement: true
      },{
        width: 200,
        rename: {
          suffix: '-200px',
          extname: '.webp'
        }
      },{
        width: 300,
        rename: {
          suffix: '-300px',
          extname: '.webp'
        }
      },{
        width: 400,
        rename: {
          suffix: '-400px',
          extname: '.webp'
        }
      },{
        width: 600,
        rename: {
          suffix: '-600px',
          extname: '.webp'
        }
      },{
        width: 800,
        rename: {
          suffix: '-800px',
          extname: '.webp'
        },
        withoutEnlargement: true
      }]
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Zlib compression level of PNG output format
      compressionLevel: 6,
      // Strip all metadata
      withMetadata: false,
    }))
    .pipe(gulp.dest(IMG_DEST));
});

gulp.task('css', function() {
  return gulp.src('./_site/assets/main.css')
    .pipe(purify(['./_site/**/*.js', './_site/**/*.html']))
    .pipe(gulp.dest('./src/'));
});


var critical = require('critical').stream;
// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('_site/*.html')
        .pipe(critical({base: '_site/', inline: true}))
        .pipe(gulp.dest('_site'));
});

const IMG_PROD_SRC = './src/assets/img_productos/**/*.jpg';
const IMG_PROD_DEST = './img/productos/';

gulp.task('prodImg', function () {
  return gulp.src(IMG_PROD_SRC)
    .pipe(responsive({
      '**/*.jpg': [{
        width: 25,
        rename: {
          prefix: 'lqip-'
        }
      },{
        width: 200,
        rename: {
          suffix: '-200px'
        }
      },{
        width: 300,
        rename: {
          suffix: '-300px'
        }
      },{
        width: 400,
        rename: {
          suffix: '-400px'
        }
      },{
        width: 600,
        rename: {
          suffix: '-600px'
        }
      }]
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
    }))
    .pipe(gulp.dest(IMG_PROD_DEST));
});