var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    AngularContext = require('../lib/angularContext');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('AngularContext', function () {

    describe('load', function () {
        it('parses the modules name', function () {
            var context = new AngularContext('./test/files/');
            var sources = context.sources().then(function(sources){
                return sources.map(function(file){
                    return file.replace(__dirname.replace(/\\/g, '/'),'');
                });
            });

            return sources.should.eventually
                .eql(['/files/testmodule_001/test.module.js', '/files/testmodule_001/test.config.js']);
        });

        it('parses the modules name', function () {
            var context = new AngularContext('./test/files/');
            var modules = context.modules().then(function (modules) {
                return modules.map(function (module) {
                    return module.name();
                })
            });

            return modules.should.eventually
                .eql(['testmodule_001']);
        });
    });
});