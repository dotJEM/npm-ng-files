/*global module:false*/
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '',
        mochaTest: {
            test: {
                src: ['test/**/*.spec.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task.
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['test']);
};