var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    ngFiles = require('../lib/ng-files');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('ngFiles', function () {

    describe('getSources', function () {
        it('orders files according to dependencies', function () {
            var sources = ngFiles.getSources('./test/files/').then(function (sources) {
                return sources.map(function (file) {
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
    });
});