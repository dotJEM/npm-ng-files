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
The angular context will look for a file ending on .module.js which is expected to be a module difinition, e.g. containing:

```javascript
angular.module('name', ['dependency']);
```

If it finds sucn a file in a folder, that folder is treated as a module and all files in that folder and subfolders of it will be loaded into the module.

As such a structure could be:
```
scritpts/
  module1/
    module1.module.js
    config1.js
    controllers/
      myController.js
  module2/
    module2.module.js
    config2.js
    controllers/
      myOtherController.js
  subs/
    module3/
      module3.module.js
      config4.js
      controllers/
        myThirdController.js
    module4/
      module4.module.js
      config4.js
      controllers/
        myFinalController.js

```


if a module dependency is not loaded as part of the process, it's considered a 3rd party deppendency and ignored when building the tree as it is expected that all modules of that sort is loaded first.

Final note, this is still experimental.
