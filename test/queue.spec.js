var chai = require('chai'),
    expect = require('expect.js'),
    Queue = require('../lib/queue.js');

chai.should();

describe('queue', function() {
    describe('enqueue', function() {
        it('', function() {
            var queue = new Queue();

            queue.count().should.eql(0);
            queue.empty().should.eql(true);

            queue.enqueue(42);
            queue.peek().should.eql(42);
            queue.count().should.eql(1);
            queue.empty().should.eql(false);

            queue.dequeue().should.eql(42);
            queue.count().should.eql(0);
            queue.empty().should.eql(true);

            expect(queue.dequeue()).to.be.an('undefined');
        });

        it('init from array', function() {
            var queue = new Queue(['foo', 'bar']);

            queue.count().should.eql(2);
            queue.empty().should.eql(false);


            queue.dequeue().should.eql('foo');
            queue.dequeue().should.eql('bar');
            queue.count().should.eql(0);
            queue.empty().should.eql(true);
        });

        it('init from object', function() {
            var queue = new Queue({ foo: 'foo', bar: 'bar' });

            queue.count().should.eql(2);
            queue.empty().should.eql(false);


            queue.dequeue().should.eql('foo');
            queue.dequeue().should.eql('bar');
            queue.count().should.eql(0);
            queue.empty().should.eql(true);
        });

    });
});