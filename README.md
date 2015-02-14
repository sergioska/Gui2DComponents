# Gui2DComponents 
Alternative angularjs components for GUI

> An alternative collection of reusable UI components for [AngularJS](https://angularjs.org/)

Live demo coming soon ...

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

Include the required bower component:
``` html
<link rel="stylesheet" href="bower_components/gui-2d-components/src/css/gui-2d-components.css"/>
<script src="bower_components/gui-2d-components/src/js/gui-2d-components.js"></script>
```

Inject the `Gui2DComponents` module into your app:
``` JavaScript
angular.module('myApp', ['Gui2DComponents.js']);
```

# Using

```html
<rotative id="one" color="orange" min="0" max="10" step="0.1" label="gain"></rotative>
```

```html
<selector id="two" color="blue" position="5" label="type"></selector>
```

