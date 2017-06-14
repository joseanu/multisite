// Modificado de https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulpfile.js

'use strict';
const fs          = require('fs'),
      argv        = require('yargs').argv,
      gulp        = require('gulp'),
      requireDir  = require('require-dir'),
      tasks       = requireDir('./gulp/tasks', {recurse: true}),
      paths       = require('./gulp/paths');

const webSite     = '_' + argv.site + '/';

const config      = require('./' + webSite + 'config');

if (fs.existsSync('./' + webSite + 'gulp')) {
  var websiteTasks = requireDir('./' + webSite + 'gulp', {recurse: true});
}

let buildSite = [
  'copy:tmp',
  'inject',
  'site',
  'copy:site'
];
let buildSequence = [
  'clean',
  'assets',
  'build:site',
  'html',
  'copy:static'
];
const watcher = (config.tasks && config.tasks.watcher) || 'watch';

if (config.tasks) {
  if (config.tasks.buildSite)
    buildSite = config.tasks.buildSite;
  if (config.tasks.buildSequence)
    buildSequence = config.tasks.buildSequence;
};

gulp.task('images', gulp.series('images:noresize', 'images:responsive', 'images:svg'));

gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts'),
  gulp.series('images', 'copy:assets')
));

gulp.task('clean', gulp.parallel('clean:assets', 'clean:dist', 'clean:site'));

gulp.task('inject', gulp.parallel('inject:css', 'inject:scripts'));

gulp.task('php', gulp.parallel('copy:php', 'copy:phplib'));

gulp.task('build:site', gulp.series(buildSite));

gulp.task('build', gulp.series(buildSequence));

gulp.task('default', gulp.series('build', gulp.parallel(watcher, 'server')));
