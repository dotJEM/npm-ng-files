(function () {
    "use strict";
    var glob = require('./globPromise.js');
    var fileUtil = require('./fileUtil.js');
    var q = require('q');

    function sortScripts(path) {
        return glob('/**/*.js', { root: path })
            .then(function (files) {
                files.sort(function (left, right) {
                    if (left.indexOf('module.js') > 0) return -1;
                    if (right.indexOf('module.js') > 0) return 1;
                    return 0;
                });
                return files;
            });
    }

    function extractDefinition(value) {
        var moduleRegex = /angular\.module\s*\((.*?\[.*?\].*?)\)/g;
        return value.then(function (files) {
            return fileUtil.replace(files[0], /(\r\n|\n|\r|\s{2,})/gm, ' ');
        }).then(function (source) {
            return moduleRegex.exec(source)[0];
        });
    }

    function parseDependencies(value) {
        var dependenciesRegex = /('(.+?)'|"(.+?)")/g,
            match, dependencies = [];
        while ((match = dependenciesRegex.exec(value)) !== null) {
            dependencies.push(match[2] || match[3]);
        }
        return dependencies;
    }

    function extractDependencies(value) {
        var definitionRegex = /('(.+?)'|"(.+?)")\s*,\s*\[(.*?)\]/g;
        return value.then(function (definition) {
            var match = definitionRegex.exec(definition);
            return {
                name: match[2] || match[3],
                dependencies: parseDependencies(match[4])
            }
        });
    }

    module.exports = (function () {

        function AngularModule(name, sources, dependencies) {
            this._name = name;
            this._sources = sources;
            this._dependencies = dependencies;
        }

        AngularModule.load = function (path) {
            var scripts = sortScripts(path);
            var definition = extractDefinition(scripts);
            var dependencies = extractDependencies(definition);
            return scripts.then(function (sortedScripts) {
                return dependencies.then(function (obj) {
                    return new AngularModule(obj.name, sortedScripts, obj.dependencies);
                });
            });
        };

        AngularModule.prototype.sources = function () {
            return this._sources;
        };

        AngularModule.prototype.dependencies = function () {
            return this._dependencies;
        };

        AngularModule.prototype.name = function () {
            return this._name;
        };

        return AngularModule;
    })();
})();
