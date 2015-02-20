# Gui2DComponents 
Alternative angularjs components for GUI

> An alternative collection of reusable UI components for [AngularJS](https://angularjs.org/)

Live demo and documentation on http://sergioska.github.io/Gui2DComponents/

## Quick start

# Install via Bower
``` sh
bower install gui-2d-components.js --save
```

# Clone repository
``` sh
git clone https://github.com/sergioska/Gui2DComponents.git
cd Gui2DComponents
bower install
npm install
grunt client
```

# Test
``` sh
grunt test
```

# Using

Include the required bower component:
``` html
<link rel="stylesheet" href="bower_components/gui-2d-components/src/css/gui-2d-components.css"/>
<script src="bower_components/gui-2d-components/src/js/gui-2d-components.js"></script>
```

Inject the `Gui2DComponents` module into your app:
``` JavaScript
angular.module('myApp', ['Gui2DComponents.js']);
```

to use rotative component:

```html
<rotative id="one" color="orange" min="0" max="10" step="0.1" label="gain" ng-model="gainValue"></rotative>
```

to use selector component:

```html
<selector id="two" color="blue" position="5" label="type" ng-model="typeValue"></selector>
```

to use switch component:

```html
<switch id="three" ng-model="switchStatus"></switch>
```

You can add nc-click attribute to switch component and read switch status on function body; for example:

```javascript
    // suppose that we have ng-click="play()" like attribute on html switch component declaration
    $scope.play = function() {
        // read switch component status from ng-model
        if($scope.switchStatus === 1)
    	   $scope.synth.playNote();
        else $scope.stop();
    };
```

