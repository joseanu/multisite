'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      del         = require('del');

// include paths
const paths       = require('../paths');

const webSite     = argv.site + '/';

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
gulp.task('clean:assets', () => {
  return del([
    webSite + paths.tempFolderName + '/**/*',
    '!' + webSite + paths.assetFilesTemp,
    webSite + paths.assetFilesSite + '/**/*',
    '!' + webSite + paths.imageFilesSite,
    '!' + webSite + paths.imageFilesSite + '/**/*'
  ]);
});

// 'gulp clean:site' -- removes temporary source
gulp.task('clean:site', () => {
  return del([webSite + paths.tempDir  + paths.sourceFolderName]);
});

// 'gulp clean:dist' -- removes built site but keep images
gulp.task('clean:dist', () => {
  return del([
    webSite + paths.siteFolderName + '/**/*',
    '!' + webSite + paths.assetFilesSite,
    '!' + webSite + paths.imageFilesSite,
    '!' + webSite + paths.imageFilesSite + '/**/*'
  ], {'dot': true});
});