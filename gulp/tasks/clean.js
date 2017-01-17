'use strict';
const gulp         = require('gulp');
const del          = require('del');

// include paths
const paths        = require('../paths');

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
gulp.task('clean:assets', () => {
  return del([paths.tempFolderName + '/**/*', '!' + paths.assetFilesTemp, paths.assetFilesSite + '/**/*', '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*']);
});

// 'gulp clean:site' -- removes temporary source
gulp.task('clean:site', () => {
  return del([paths.tempDir  + paths.sourceFolderName]);
});

// 'gulp clean:dist' -- removes built site but keep images
gulp.task('clean:dist', () => {
  return del([paths.siteFolderName + '/**/*', '!' + paths.assetFilesSite, '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*'], {'dot': true});
});

gulp.task('clean:productos', () => {
  return del(paths.tempDir + paths.siteDir + 'img');
});