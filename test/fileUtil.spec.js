var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    fileUtil = require('../lib/fileUtil.js');

require("mocha-as-promised")();
chai.use(chaiAsPromised);
chai.should();

describe('fileUtil', function() {
    describe('replace', function() {
        it('can replace linebreaks and double whitespaces with single whitespace', function() {
            return fileUtil.replace('./test/files/testdir_001/simple.txt', /(\r\n|\n|\r|\s{2,})/gm, ' ')
                .should.eventually.eql('some simple text with big linebreaks');
        });

        it('can replace linebreaks and double whitespaces with dashes', function() {
            return fileUtil.replace('./test/files/testdir_001/simple.txt', /(\r\n|\n|\r|\s{2,})/gm, '-')
                .should.eventually.eql('some-simple-text-with-big linebreaks');
        });
    });
    describe('directories', function() {

        it('can replace linebreaks and double whitespaces with dashes', function() {
            return fileUtil.directories('./test/files/')
                .should.eventually.eql(['test/files/testdir_001', 'test/files/testmodule_001']);
        });
    });
});