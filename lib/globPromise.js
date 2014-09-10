(function () {
    "use strict";
    var glob = require('glob');
    var q = require('q');

    module.exports = function (pattern, options) {
        var deferred = q.defer();
        glob(pattern, options, function (err, files) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(files);
            }
        });
        return deferred.promise;
    }
})();
