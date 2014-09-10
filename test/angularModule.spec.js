var chai = require('chai'),
    path = require('path'),
    chaiAsPromised = require("chai-as-promised"),
    AngularModule = require('../lib/angularModule');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('AngularModule', function() {

    describe('load', function() {
        it('parses the modules name', function() {
            var module = AngularModule.load('./test/files/testmodule_001/');
            return module.should.eventually.have.property('_name', 'testmodule_001');
        });

        it('registers the module sources', function() {
            var module = AngularModule.load('./test/files/testmodule_001/');
            var sources = module.then(function(module){
                return module.sources().map(function(file){
                    return file.replace(__dirname.replace(/\\/g, '/'),'');
                });
            });

            return sources.should.eventually
                .eql(['/files/testmodule_001/test.module.js', '/files/testmodule_001/test.config.js']);
        });

        it('finds the modules dependencies', function() {
            var module = AngularModule.load('./test/files/testmodule_001/');
            var dependencies = module.then(function(module){return module.dependencies();});

            return dependencies.should.eventually
                .eql(['foo', 'bar']);
        });
    });
});