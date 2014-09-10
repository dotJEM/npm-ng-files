(function () {
    "use strict";
    var AngularModule = require('./angularModule.js');
    var Queue = require('./queue.js');
    var fileUtil = require('./fileUtil.js');
    var glob = require('./globPromise.js');
    var q = require('q');

    function isModule(path) {
        return glob('/*.module.js', { root: path }).then(function (files) {
            return files.length > 0
        });
    }

    function argsToArray(args) {
        var arr = [];
        for (var i = 0, l = args.length; i < l; i++) {
            arr.push(args[i]);
        }
        return arr;
    }

    function load(context, dirs) {
        return q.all(dirs.map(function (path) {
            return isModule(path)
                .then(function (result) {
                    if (result) {
                        return AngularModule.load(path)
                            .then(function (module) {
                                context._modules[module.name()] = module;
                            });
                    } else {
                        return fileUtil.directories(path).then(function (dirs) {
                            if (dirs.length > 0) {
                                return load(context, dirs);
                            }
                        });
                    }
                })
        }));
    }

    module.exports = (function () {
        function AngularContext() {
            var self = this;
            this._modules = {};
            this._promises = [];
            this.load.apply(this, arguments);

            //Note: this must not go on the prototype as we need to create a new function on each
            //      new AngularContext. Alternatively we could implement a Lazy class...
            this._ordered = function () {
                var queue = new Queue(self._modules),
                    ordered = [],
                    orderedMap = {},
                    module,
                    satisfied;

                while (!queue.empty()) {
                    module = queue.dequeue();
                    satisfied = module.dependencies().every(function (name) {
                        return orderedMap[name] || !self._modules.hasOwnProperty(name);
                    });
                    if (satisfied) {
                        ordered.push(module);
                        orderedMap[module.name()] = true;
                    } else {
                        queue.enqueue(module);
                    }
                }

                return (self._ordered = function () {
                    return ordered;
                })();
            };
        }

        AngularContext.prototype.load = function () {
            this._promises.push(load(this, argsToArray(arguments)));
            return this;
        };

        AngularContext.prototype.modules = function () {
            var self = this;
            return q.all(this._promises).then(function () {
                self._promises = [];
                return self._ordered();
            });
        };

        AngularContext.prototype.sources = function () {
            function flatten(arrays) {
                return [].concat.apply([], arrays);
            }

            return this.modules().then(function (modules) {
                return flatten(modules.map(function (module) {
                    return module.sources();
                }));
            });
        };

        return AngularContext;
    })();
})();
