'use strict';
const argv         = require('yargs').argv,
      path         = require('path'),
      gulp         = require('gulp'),
      webpack      = require('webpack'),
      webpackstats = require("webpack-stats-plugin").StatsWriterPlugin,
      Analyzer     = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      Md5Hash      = require('webpack-md5-hash');

// include paths
const paths        = require('../paths');

const webSite       = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

var entradas = config.webpackEntry || { main: './main' };

gulp.task('scripts', function(callback) {
  var webpackPlugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(argv.prod ? 'production' : 'development'),
      }
    })
  ];
  var output = {
    path: path.join('/home/ubuntu/workspace/', webSite + paths.jsFilesTemp),
    publicPath: '/' + paths.assetsDir + paths.scriptFolderName + '/',
    sourceMapFilename: '[file].map'
  };
  var sourceMap = '';

  if (argv.analyze) {
    webpackPlugins.push(new Analyzer({
      analyzerMode: 'server',
      analyzerHost: process.env.IP,
      analyzerPort: process.env.PORT,
    }));
  }
  if (argv.prod) {
    webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }));
    webpackPlugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true
    }));
    webpackPlugins.push(new Md5Hash());
    output.filename = '[name]-[chunkhash].js';
    output.chunkFilename = 'chunk/[name]-[chunkhash].js';
    sourceMap = '#source-map';
  } else {
    output.filename = '[name].js';
    output.chunkFilename = 'chunk/[name].js';
    sourceMap = '#cheap-module-source-map';
  }
  webpackPlugins.push(new webpackstats({
    filename: "stats.json",
    fields: null
  }));
  webpackPlugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  var webpackConfig = {
    context: path.join('/home/ubuntu/workspace/', webSite + paths.jsFiles),
    entry: entradas,
    output: output,
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
    devtool: sourceMap,
    plugins: webpackPlugins
  };

  webpack(webpackConfig, function(err, stats) {
    if (err) {
      return callback(err);
    }
    console.log(stats.toString({chunks: false}));
    callback();
  });
});
