'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      ftp         = require('vinyl-ftp'),
      rlSync      = require('readline-sync');

// include paths
const paths       = require('../paths');

const webSite     = argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

const localpath   = './' + webSite + paths.siteDir;

const ftpconfig = {
        host: config.ftphost,
        user: argv.user,
        password: argv.pass,
        parallel: 2,
        log: gutil.log
      };

gulp.task('deploy:ftp', gulp.series(
  function passwd (done) {
    if (!argv.pass) {
      ftpconfig.password = rlSync.question('Escribe la contraseña del servidor FTP: ', {
        hideEchoBack: true
      });
    }
    return done();
  },
  function subir () {
    const conn = ftp.create(ftpconfig);
    return gulp.src(localpath + '**/*', { base: localpath, buffer: false })
          .pipe( conn.newerOrDifferentSize( config.ftppath ) )
          .pipe( conn.dest( config.ftppath ) )
  }
));