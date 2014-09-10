(function() {
    "use strict";
    var AngularContext = require('./angularContext.js');

    function argsToArray(args) {
        var arr = [args.length];
        for (var i = 0, l = args.length; i < l; i++) {
            arr[i] = args[i];
        }
        return arr;
    }

    module.exports = {
        getSources: function(){
            console.log(JSON.stringify(argsToArray(arguments)));

            var context = new AngularContext();
            context.load.apply(context, arguments);
            return context.sources();
        },
        AngularContext: AngularContext
    }
})();
