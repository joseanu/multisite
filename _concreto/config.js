// Archivo de configuración
// 
// concretoenguadalajara.com

'use strict';
var config = {};

config.deploymentMethod = 'ftp';
config.ftphost = 'concretoenguadalajara.com';
config.ftppath = '/';

config.tasks = {
  buildSequence: [
    'clean',
    'assets',
    'build:site',
    'html',
    'unused-css',
    'php',
    'copy:static'
  ]
}

module.exports = config;