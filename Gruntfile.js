var config = require('./src/js/app/config');
var pkg = require('./package');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-express-server');

  var productionBuild = !!(grunt.cli.tasks.length && (grunt.cli.tasks[0] === 'build' || grunt.option('production')));

  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    jshint: {
      files: ['Gruntfile.js', 'src/app/**/*.js', 'test/**/*.js'],
    },
    clean: {
      engine: ['./build/'],
      buildGame: ['<%= gameBuildConfig.buildPath %>']
    },
    browserify: {
      prototype: {
        src: [config.project.entry],
        dest: config.project.prototype + config.project.bundle,
        options: {
          transform: ['browserify-shim', 'envify'],
          watch: true,
          browserifyOptions: {debug: !productionBuild}
        }
      },
      production: {
        src: [config.project.entry],
        dest: config.project.build + config.project.bundle,
        options: {
          transform: ['browserify-shim', 'envify'],
          watch: true,
          browserifyOptions: {debug: !productionBuild}
        }
      }
    },
    sass: {
      production: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.sass'],
          dest: './build/css',
          ext: '.css'
        }]
      },
      prototype: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.sass'],
          dest: './prototype/css',
          ext: '.css'
        }]
      }
    },
    jade: {
      production: {
        options: {
          data: {
            pkg: pkg,
            config: config,
          }
        },
        files: [
          {
            cwd: "src/templates",
            src: "index.jade",
            dest: "build/",
            expand: true,
            ext: ".html"
          }
        ]
      },
      prototype: {
        options: {
          data: {
            pkg: pkg,
            config: config,
            project: config.project
          }
        },
        files: [
          {
            cwd: "src/templates",
            src: "index.jade",
            dest: "prototype/",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },
    express: {
      dev: {
        options: {
          port: config.development.port,
          files: ['./build/**'],
          script: config.project.server,
          logs: 'out'
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:' + config.development.port
      }
    },
    watch: {
      options: {
        livereload: productionBuild ? false : config.development.liveReloadPort
      },
      hint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      server: {
        files: ['./server/*.js'],
        tasks: ['express'],
        options: {
          spawn: false
        }
      },
      jade: {
        files: 'src/templates/*.jade',
        tasks: ['jade:prototype']
      },
      sass: {
        files: 'src/sass/*.sass',
        tasks: ['sass:prototype']
      },
      build: {
        files: [config.project.srcFiles],
        tasks: ['browserify']
      },
      app: {
        files: [config.project.srcFiles],
        tasks: ['express']
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },
    uglify: {
      prototype: {
        files: {
          'prototype/js/lib.min.js': [
            'src/js/vendor/three.js/three.min.js',
            'src/js/vendor/threex.windowresize/threex.windowresize.js',
            'src/js/vendor/threex.rendererstats/threex.rendererstats.js',
          ]
        }
      },
    }
  });

  grunt.registerTask('default', [
      'jshint',
      'browserify:prototype',
      'sass:prototype',
      'jade:prototype',
      'uglify:prototype',
      'express',
      'open',
      'watch'
    ]
  );

  grunt.registerTask('build', [
      'jshint',
      'sass:production',
      'browserify:production',
      'jade:production'
    ]
  );

};
