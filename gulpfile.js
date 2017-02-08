// Modificado de https://github.com/mmistakes/made-mistakes-jekyll/blob/master/gulpfile.js

'use strict';

const gulp        = require('gulp');
const requireDir  = require('require-dir');
const tasks       = requireDir('./gulp/tasks', {recurse: true}); // eslint-disable-line

// include paths file
var paths         = require('./gulp/paths');

// 'gulp images' -- copies, builds, and then copies it again
gulp.task('images', gulp.series('images:noresize', 'images:svg'));

// 'gulp scripts' -- genera los JS
gulp.task('scripts', gulp.parallel('scripts:webpack'));

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
gulp.task('php', gulp.parallel('copy:phplib', 'copy:php'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('copy:tmp', 'inject', 'site', 'copy:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html', 'php', 'copy:static', 'inject:htaccess'/*, 'inject:trabajador'*/));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));
