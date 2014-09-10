var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    ngFiles = require('../lib/ng-files');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('AngularContext', function () {



    describe('load', function () {
        it('parses the modules name', function () {
            var sources = ngFiles.getSources('./test/files/').then(function(sources){
                return sources.map(function(file){
                    return file.replace(__dirname.replace(/\\/g, '/'),'');
                });
            });

            return sources.should.eventually
                .eql(['/files/testmodule_001/test.module.js', '/files/testmodule_001/test.config.js']);
        });
    });
});