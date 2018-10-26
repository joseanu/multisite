'use strict';
const argv            = require('yargs').argv,
      path            = require('path'),
      gulp            = require('gulp'),
      webpack         = require('webpack'),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      webpackstats    = require("webpack-stats-plugin").StatsWriterPlugin,
      Analyzer        = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      UglifyJsPlugin  = require('uglifyjs-webpack-plugin');

// include paths
const paths        = require('../paths');

const webSite       = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

var entradas = config.webpackEntry || { main: './main' };

gulp.task('scripts', function(callback) {
  var mode = argv.prod ? 'production' : 'development';
  var webpackPlugins = [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpackstats({
      filename: "stats.json",
      fields: null
    })
  ];
  var output = {
    path: path.join(process.cwd(), webSite + paths.jsFilesTemp),
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
    output.filename = '[name]-[chunkhash].js';
    output.chunkFilename = 'chunk/[name]-[chunkhash].js';
    sourceMap = '#source-map';
  } else {
    output.filename = '[name].js';
    output.chunkFilename = 'chunk/[name].js';
    sourceMap = '#cheap-module-source-map';
  }

  var webpackConfig = {
    mode,
    context: path.join(process.cwd(), webSite + paths.jsFiles),
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
            cssSourceMap: false,
            preserveWhitespace: false
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
      ],
      strictThisContextOnImports: true
    },
    optimization: {
      minimizer: [new UglifyJsPlugin({
        sourceMap: true
      })]
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
