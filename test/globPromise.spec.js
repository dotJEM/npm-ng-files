var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    glob = require('../lib/globPromise');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('globPromise', function() {
    describe('glob', function() {
        it('loads module', function() {
            return glob('./test/files/testdir_001/*.txt').should.eventually
                .eql(['./test/files/testdir_001/simple.txt']);
        });

        it('loads module', function() {
            return glob('./test/files/testmodule_001/*.js').should.eventually
                .eql(['./test/files/testmodule_001/test.config.js', './test/files/testmodule_001/test.module.js']);
        });
    });
});