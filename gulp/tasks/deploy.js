'use strict';
const argv        = require('yargs').argv,
      gulp        = require('gulp'),
      shell       = require('shelljs'),
      gutil       = require('gulp-util'),
      ftp         = require('vinyl-ftp'),
      rlSync      = require('readline-sync');

// include paths
const paths       = require('../paths');

const webSite     = '_' + argv.site + '/';

// include config
const config      = require('../../' + webSite + 'config');

gulp.task('deploy:ftp', function deployFTP () {
  if (config.deploymentMethod === 'ftp') {
    const localpath   = './' + webSite + paths.siteDir;
    const ftpconfig = {
          host: config.ftphost,
          user: argv.user,
          password: argv.pass,
          parallel: 2,
          log: gutil.log
        };
    if (!argv.pass) {
      ftpconfig.password = rlSync.question('Escribe la contraseña del servidor FTP: ', {
        hideEchoBack: true
      });
    }
    const conn = ftp.create(ftpconfig);
    return gulp.src(localpath + '**/*', { dot: true, base: localpath, buffer: false })
          .pipe( conn.newerOrDifferentSize( config.ftppath ) )
          .pipe( conn.dest( config.ftppath ) );
  }
});

gulp.task('deploy:netlify', function netlify(done) {
  shell.cd('_' + argv.site);
  if (shell.exec('netlify deploy').code !== 0) {
    shell.echo('Error: Netlify deployment failed');
    shell.exit(1);
  }
  shell.cd('..');
  done();
});

gulp.task('deploy:firebase', function netlify(done) {
  shell.cd('_' + argv.site);
  if (shell.exec('firebase deploy').code !== 0) {
    shell.echo('Error: Firebase deployment failed');
    shell.exit(1);
  }
  shell.cd('..');
  done();
});