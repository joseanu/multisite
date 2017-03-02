// Modificado de https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulpfile.js

'use strict';
const gulp        = require('gulp'),
      requireDir  = require('require-dir'),
      tasks       = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// include paths file
const paths       = require('./gulp/paths');

// 'gulp images' -- copies, builds, and then copies it again
gulp.task('images', gulp.series('images:noresize', 'images:responsive', 'images:svg'));

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts'),
  gulp.series('images', 'copy:assets')
));

// 'gulp clean' -- removes temporary and built files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:dist', 'clean:site'));

// 'gulp inject' -- injects CSS and JS into includes
gulp.task('inject', gulp.parallel('inject:css', 'inject:scripts'));

// 'gulp php' -- Copa archivos php a _site
gulp.task('php', gulp.parallel('copy:php', 'copy:phplib'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('copy:tmp', 'inject', 'site', 'copy:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html', 'php', 'copy:static'));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));
