var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    AngularContext = require('../lib/angularContext');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('AngularContext', function () {

    describe('load', function () {
        it('orders files according to dependencies', function () {
            var context = new AngularContext('./test/files/');
            var sources = context.sources().then(function(sources){
                return sources.map(function(file){
                    var dir = __dirname.replace(/\\/g, '/').length;
                    return file.replace(/\\/g, '/').substring(dir);
                });
            });

            return sources.should.eventually
                .eql([
                    '/files/testmodule_001/test.module.js',
                    '/files/testmodule_001/test.config.js',
                    '/files/testmodule_002/test.module.js',
                    '/files/testmodule_002/services/service.js',
                    '/files/testmodule_002/something.js',
                    '/files/testmodule_002/test.config.routes.js',
                    '/files/testmodule_002/test.config.js'
                ]);
        });

        it('parses the modules name', function () {
            var context = new AngularContext('./test/files/');
            var modules = context.modules().then(function (modules) {
                return modules.map(function (module) {
                    return module.name();
                })
            });

            return modules.should.eventually
                .eql(['testmodule_001', 'testmodule_002']);
        });
    });
});