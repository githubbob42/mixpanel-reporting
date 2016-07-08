module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');


  require('load-grunt-config')(grunt, {
    data: {
      // reference to package to extract the major/minor version number
      pkg: grunt.file.readJSON('package.json'),
      // the build number provided by CI, or default to 0
      buildnum: process.env.buildnum || grunt.option('buildnum') || 0
    },
    jitGrunt: true
  });


  grunt.registerTask('test', function(target) {
    if(target === 'unit'){
      grunt.task.run('karmacmd');
    } else {
      //continuous
      grunt.task.run('karma:continuous');
    }
  });

  grunt.registerTask('karmacmd', function() {
    var done = this.async();
    console.log(['karma', 'start', path.join(__dirname, 'tests', 'karma.conf.js')].join(' '));
    
    var ps = grunt.util.spawn({ 
      cmd: 'karma', 
      args: [ 'start', path.join(__dirname, 'tests', 'karma.conf.js') ]}, 
      //watch process doesn't "complete", it will continue to watch until process terminates.
      function onComplete() { }
    );

    if (!ps) {
      console.log('shell karma start failed. Please ensure karma is installed globally(npm install -g karma)');
      process.kill();
    }

    ps.stdout.on('data', function(data) {
      console.log('' + data);
    });

    done();
  });
};
