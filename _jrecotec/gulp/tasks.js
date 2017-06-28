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

gulp.task('imgProductos', () => {
  return gulp.src(webSite + paths.imageFiles + '/productos' + paths.imagePattern)
    .pipe(mapDir({
      filename: 'imageList.json'
    }))
    .pipe(gulp.dest(webSite + paths.tempDir + paths.sourceDir + '_data/'));
});

gulp.task('mapa', function() {
  if (shell.exec('node ./_jrecotec/src/assets/mapa/mapa-home.js').code == 0) {
    return gulp.src(webSite + 'src/assets/mapa/mapa-sucursales.svg')
      .pipe(svgmin({
        plugins: [{
          cleanupIDs: false
        }, {
          collapseGroups: false
        }, {
          mergePaths: false
        }]
      }))
      .pipe(cheerio({
        run: function($, file) {
          $('svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe(rename('mapaSucursales.svg'))
      .pipe(gulp.dest(webSite + 'src/assets/img/svg/'));
  }
});

gulp.task('build:catalogo', function(callback) {
  var webpackConfig = {
    context: path.resolve(__dirname, '../src/assets/js/Functions/catalogo'),
    entry: { main: './entry.js' },
    target: 'node',
    output: {
      path: path.resolve(__dirname, '../.tmp/vue-ssr-build'),
      publicPath: '/vue-ssr-build/',
      filename: 'server-bundle.js',
      libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
      whitelist: /\.css$/
    }),
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(jsx?|vue)$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            },
            cssSourceMap: false
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              ["es2015", { "modules": false }]
            ],
            plugins: ['syntax-dynamic-import', 'transform-runtime']
          }
        }
      ],
      strictThisContextOnImports: true
    },
    devtool: '#source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      }),
      new VueSSRServerPlugin()
    ]
  };

  webpack(webpackConfig, function(err, stats) {
    if (err) {
      return callback(err);
    }
    console.log(stats.toString({chunks: false}));
    callback();
  });
});

gulp.task('genera:catalogo', function(callback) {
  const generar = require('../vue-ssr/generar');
  generar(callback);
});

gulp.task('watch:jr', () => {
  gulp.watch(
    webSite + '_config*',
    gulp.series('build:site')
  );
  gulp.watch(
    [
      webSite + paths.mdFilesGlob,
      webSite + paths.htmlFilesGlob,
      webSite + paths.ymlFilesGlob,
      webSite + paths.xmlFilesGlob
    ],
    gulp.series('build:site', 'html')
  );
  gulp.watch(
    [
      webSite + paths.jsFilesGlob,
      '!' + webSite + paths.jsFiles + '/Functions/catalogo' + paths.jsPattern
    ],
    gulp.series('scripts', 'copy:assets')
  );
  gulp.watch(
    webSite + paths.jsFiles + '/Functions/catalogo' + paths.jsPattern,
    gulp.series('build:site', 'build:catalogo', 'genera:catalogo', 'html', 'scripts', 'copy:assets')
  );
  gulp.watch(
    webSite + paths.sassFilesGlob,
    gulp.series('styles', 'copy:assets')
  );
  gulp.watch(
    webSite + paths.imageFilesGlob,
    gulp.series('images', 'copy:assets')
  );
  gulp.watch(
    webSite + paths.phpFiles + '/**/*',
    gulp.series('copy:php')
  );
});
