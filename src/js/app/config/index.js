var pkg = require('../../../../package');

var config = {
  development: {
    liveReloadPort: 35729,
    port: 3117
  },
  project: {
  }
};

config.project.src = 'src/';
config.project.js = config.project.src + 'js/';
config.project.srcFiles = config.project.js + 'app/**/*/';
config.project.app = config.project.src + 'js/app/';
config.project.components = config.project.src + 'js/app/components';
config.project.entry = config.project.app + 'index.js';
config.project.prototype = 'prototype/';
config.project.build = 'build/';
config.project.server = 'server/index.js';
config.project.css = 'css/style.css';
config.project.deps = 'js/lib.min.js';
config.project.bundle = 'js/app-' + pkg.version + '.js';

module.exports = config;
