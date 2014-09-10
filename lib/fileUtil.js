(function () {
    "use strict";
    var q = require('q');
    var fs = require('fs');
    var path = require("path");

    module.exports = {
        replace: function(p, regex, str) {
            var deferred = q.defer();
            fs.readFile(p, 'utf8', function(err, content){
               if(err){
                   deferred.reject(err);
               } else {
                   deferred.resolve(content.replace(regex, str));
               }
            });
            return deferred.promise;
        },
        directories: function(p){
            var deferred = q.defer();
            fs.readdir(p, function(err, files){
                if(err){
                    deferred.reject(err);
                } else {
                    var dirs = files.map(function (file) {
                        return path.join(p, file).replace(/\\/g, '/');
                    }).filter(function (file) {
                        return fs.statSync(file).isDirectory();
                    });
                    deferred.resolve(dirs);
                }
            });
            return deferred.promise;
        }
    }
})();
