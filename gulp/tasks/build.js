'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      shell       = require('shelljs'),
      php         = require('gulp-connect-php');

// include paths
const paths       = require('../paths');

const webSite     = '_' + argv.site + '/';

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
gulp.task('site', done => {
  if (!argv.prod) {
    shell.exec('bundle exec jekyll build --config ' + webSite + '_config.yml,' + webSite + '_config.dev.yml');
    done();
  } else if (argv.prod) {
    shell.exec('JEKYLL_ENV=production bundle exec jekyll build --config ' + webSite + '_config.yml');
    done();
  }
});

gulp.task('server', done => {
  php.server({
    base: webSite + '_site',
    hostname: process.env.IP,
    port: process.env.PORT
  });
});

gulp.task('watch', () => {
  gulp.watch(webSite + '_config*', gulp.series('build:site'));
  gulp.watch([webSite + paths.mdFilesGlob, webSite + paths.htmlFilesGlob, webSite + paths.ymlFilesGlob, webSite + paths.xmlFilesGlob], gulp.series('build:site', 'html'));
  gulp.watch(webSite + paths.jsFilesGlob, gulp.series('scripts', 'copy:assets'));
  gulp.watch(webSite + paths.sassFilesGlob, gulp.series('styles', 'copy:assets'));
  gulp.watch(webSite + paths.imageFilesGlob, gulp.series('images', 'copy:assets'));
  gulp.watch(webSite + paths.phpFiles + '/**/*', gulp.series('copy:php'));
});
