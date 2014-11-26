npm-ng-files
============
[![Build Status](https://travis-ci.org/dotJEM/npm-ng-files.svg?branch=master)](https://travis-ci.org/dotJEM/npm-ng-files)

Collects angular files from a set of directives and orders them according to their dependencies.


Install
----

```
npm install dotjem-ng-files
```


Getting Started
----

For the most simple usecase, use getSources
```javascript
var ngFiles = require('dotjem-ng-files');
var filesPromise = ngFiles.getSources('first dir', 'second dir', ... , "n'th dir");

filesPromise.then(function(angularOrderedFiles) {
  
});
```

If you wan't to collect files in separate contexts, use the AngularContext.
```javascript
var ngFiles = require('dotjem-ng-files');
var context = new ngFiles.AngularContext('first dir', 'second dir', ... , "n'th dir");
context
  .load('antoher dir')
  .load('more dirs', 'here');
  
context.sources().then(function(angularOrderedFiles) {
  
});

context.modules().then(function(orderedModules) {
  var files = orderedModules.map(function(module) { module.sources(); });
});
```

Caveats:
----
The angular context will look for specific files and treats them in a specific way.
 - If a folder contains a file that ends with `.module.js` that folder is treated as a module.
 -- The module file must contain a mudule definition: `angular.module('name', ['dependency']);`
 -- All files in a module folder and subfolders of it will be loaded into the module.
 - If a file inside a module folder contains `.config.` that file is treated as a configuration file and is loaded last.
 -- Modules may have multiple config files and petterns like `name.config.routing.js` and `name.config.js` are supported.

As such a structure could be:
```
scritpts/
  module1/
    module1.module.js
    module1.config.js
    controllers/
      myController.js
  module2/
    module2.module.js
    somefile.js
    module2.config.js
    controllers/
      myOtherController.js
  subs/
    module3/
      module3.module.js
      somefile.js
      module3.config.js
      controllers/
        myThirdController.js
    module4/
      module4.module.js
      somefile.js
      module4.config.specific.js
      module4.config.other.js
      controllers/
        myFinalController.js

```


if a module dependency is not loaded as part of the process, it's considered a 3rd party deppendency and ignored when building the tree as it is expected that all modules of that sort is loaded first.

Final note, this is still experimental.
