var Gui2DComponents = angular.module('Gui2DComponents', []);

Gui2DComponents.controller('Controller', function($scope) {

});

Gui2DComponents.directive('rotative', ['$document', function($document){
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		templateUrl: "js/templates/rotative.html",
		scope: {color: "@", min: "@", max: "@", step: "@", label: "@"},
		controller: function($scope, $element) {
			var content = $element;
			var pie = $element.find('pie');
			content.css('color', $scope.color);
			pie.css('background-color', $scope.color);
			pie.css('border-color', $scope.color);
			/*
			$scope.select = function () {
				console.log("ROTARY OK");
				var pie = $element.find('pie');
				pie.css('background-image','linear-gradient('+$scope.tot+'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%');
				pie.bind('mousedown', function() {
					console.log("OK");
					$scope.tot++;
				});
			};*/
		},
		link: function(scope, element, attr) {
	        var x = 0, y = 90, yReal = 0, color = 'white';
	        var min = scope.min;
	        var max = scope.max;
			var step = scope.step, realStep = 0;

            function bindElementMove() {
                element.bind('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    console.log("binding element to move.");
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                });
            }

            bindElementMove();

		    function mousemove(event) {
		    	realStep = ((360*scope.step)/scope.max);
		    	var prevY = element.attr('data-prevY');
		    	// check max value (starting from 90deg the end is (360+90)deg then sub 5 to have a margin)
		    	if (y > 445) y = 445;
		    	// check min value
		    	if (y < 95) y = 95;
		    	// mouse goes down
		    	if (event.pageY < prevY) {
		    		y=y+realStep;
   				// mouse goes up
    			} else {
    				y=y-realStep;
    			}
    			//console.log(y);
    			element.attr('data-prevY', event.pageY);
		      	var pie = element.find('pie');
		      	if (y > 270) {
    				yReal = y - 270 + 90;
    				color = scope.color;
    			} else {
    				yReal = y;
    				color = 'white';
    			}
		      	pie.css('background-image','linear-gradient('+yReal+'deg, transparent 50%, '+color+' 50%),linear-gradient(90deg, white 50%, transparent 50%');
		    }

    		function mouseup() {
      			$document.off('mousemove', mousemove);
      			$document.off('mouseup', mouseup);
    		}
		}
	};
}]);