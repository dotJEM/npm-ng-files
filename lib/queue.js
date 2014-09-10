(function () {
    "use strict";

    function isObject(value){
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    }

    function isArray(value){
        return Array.isArray(value);
    }

    function isDefined(value){
        return typeof value !== 'undefined';
    }

    module.exports = (function () {

        function Queue(initial) {
            this._items = [];
            this._index = 0;
            if(isDefined(initial)){
                if(isArray(initial)){
                    this._items = initial;
                } else if(isObject(initial)){
                    this._items = Object.keys(initial).map(function(key){ return initial[key]; });
                }
            }
        }

        Queue.prototype.count = function () {
            return this._items.length - this._index;
        };

        Queue.prototype.empty = function () {
            return this.count() === 0;
        };

        Queue.prototype.enqueue = function (item) {
            return this._items.push(item);
        };

        Queue.prototype.peek = function () {
            return this.empty() ? undefined : this._items[this._index];
        };

        Queue.prototype.dequeue = function () {
            var item = this.peek();
            if(!this.empty() && ++this._index * 2 > this._items.length ) {
                this._items = this._items.slice(this._index);
                this._index = 0;
            }
            return item;
        };

        return Queue;
    })();
})();
