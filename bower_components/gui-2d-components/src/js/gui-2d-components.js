var Gui2DComponents = angular.module('Gui2DComponents', []);

Gui2DComponents.controller('RotativeController', function($scope, $element) {
	var content = $element;
	var pie = $element.find('pie');
	content.css('color', $scope.color);
	pie.css('background-color', $scope.color);
	pie.css('border-color', $scope.color);
	$scope.y = 94;

	$scope.init = function() {

		var color = 'white';
		var startPoint = 94;
		if(!$scope.ngModel)
			$scope.ngModel = 0;

		var realStep = ((360 * $scope.step) / $scope.max);
		$scope.y = 94 + (realStep/$scope.step) * $scope.ngModel;
		console.log("TESTE: " + $scope.y);
		if ($scope.y > 270) {
			startPoint = $scope.y - 270 + 86;
			color = $scope.color;
		} else {
			startPoint = $scope.y;
			color = 'white';
		}
		
		pie.css('background-image','linear-gradient('+startPoint+'deg, transparent 50%, '+color+' 50%),linear-gradient(90deg, white 50%, transparent 50%');
	};
});

Gui2DComponents.directive('rotative', ['$document', function($document){
	return {
		require : '^?ngModel',
		restrict: 'E',
		replace: true,
		templateUrl: "bower_components/gui-2d-components/src/js/templates/rotative.html",
		scope: {color: "@", min: "@", max: "@", step: "@", ngModel: "=", label: "@", out: "@"},
		controller: 'RotativeController',
		link: function(scope, element, attr, ngModel) {

			scope.out = 94;
			var yReal = 0, color = 'white';
			var step = scope.step, realStep = 0, output = 0;

			function bindElementMove() {
				element.bind('mousedown', function (event) {
					// Prevent default dragging of selected content
					//console.log("binding element to move.");
					$document.bind('mousemove', mousemove);
					$document.bind('mouseup', mouseup);
				});
			}

			bindElementMove();

			function mousemove(event) {
				var realStep = ((360*scope.step)/scope.max);
				var prevY = element.attr('data-prevY');
				if(typeof(prevY)==="undefined")prevY=0;
				// mouse goes down
				if (event.pageY < prevY) {
					scope.y = scope.y + realStep;
					output = output + parseFloat(scope.step);
					scope.ngModel = scope.ngModel + parseFloat(scope.step);
				// mouse goes up
				} else {
					scope.y = scope.y - realStep;
					output = output - parseFloat(scope.step);
					scope.ngModel = scope.ngModel - parseFloat(scope.step);
				}

				// check min value
				if (scope.y < 94) {scope.y = 94; output = parseInt(scope.min); scope.ngModel = parseInt(scope.min);}

				element.attr('data-prevY', event.pageY);
				var pie = element.find('pie');
				
				if (scope.y > 270) {
					yReal = scope.y - 270 + 86;
					color = scope.color;
				} else {
					yReal = scope.y;
					color = 'white';
				}

				// check max value (starting from 90deg the end is (360+90)deg then sub 5 to have a margin)
				if (scope.y > 448) {scope.y = 448; output = parseInt(scope.max); scope.ngModel = parseInt(scope.max);}

				scope.out = output;
				
            	scope.ngModel = Math.round(scope.ngModel*100)/100;
				ngModel.$setViewValue(scope.ngModel);

				pie.css('background-image','linear-gradient('+yReal+'deg, transparent 50%, '+color+' 50%),linear-gradient(90deg, white 50%, transparent 50%');
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		}
	};
}]);

Gui2DComponents.directive('selector', ['$document', function($document){
	return {
		require : '?ngModel',
		restrict: 'E',
		replace: true,
		templateUrl: "bower_components/gui-2d-components/src/js/templates/rotative.html",
		scope: {color: "@", label: "@", position: "@", ngModel: "=", out: "@"},
		controller: function($scope, $element) {
			var content = $element;
			var pie = $element.find('pie');
			content.css('color', $scope.color);
			pie.css('background-color', $scope.color);
			pie.css('border-color', $scope.color);
			pie.addClass("zeroPositionLeft");
		},
		link: function(scope, element, attr, ngModel) {
			var x = 0, y = 110, yReal = 0, color = 'white', currentPosition = 0;
			function bindElementMove() {
				element.bind('mousedown', function (event) {
					// Prevent default dragging of selected content
					$document.bind('mousemove', mousemove);
					$document.bind('mouseup', mouseup);
				});
			}

			bindElementMove();

			function mousemove(event) {

				var realStep = 360/parseInt(scope.position);
				var lastPos = realStep*parseInt(scope.position);
				var prevY = element.attr('data-prevY');
				var checkPos = element.attr('data-checkPos');
				currentPosition = element.attr('data-currentPosition');
				if(typeof(checkPos)==="undefined")checkPos=0;
				if(typeof(currentPosition)==="undefined")currentPosition=0;
				// mouse goes down
				if (event.pageY < prevY) {
					checkPos=parseInt(checkPos)+10;
					if(checkPos>(realStep-1)){
						currentPosition = parseInt(currentPosition) + 1;
						y=y+realStep;
						checkPos=0;
					}
				// mouse goes up
				} else {
					checkPos=parseInt(checkPos)+10;
					if(checkPos>(realStep-1)){
						currentPosition = parseInt(currentPosition) - 1;
						y=y-realStep;
						checkPos=0;
					}
				}
				// check min value
				if (y <= 110) {y = 110; currentPosition=0;}
				// check max value
				if (y > lastPos) {y = lastPos; currentPosition=scope.position-1;}
				element.attr('data-prevY', event.pageY);
				element.attr('data-checkPos', checkPos);
				element.attr('data-currentPosition', currentPosition);
				var pie = element.find('pie');

				yReal = y;
				color = 'white';
				scope.out = currentPosition;
				if(!ngModel){
                	return;
            	}
				ngModel.$setViewValue(currentPosition);
				pie.css('background-image','linear-gradient('+yReal+'deg, transparent 50%, '+color+' 50%),linear-gradient('+(yReal+4)+'deg, white 50%, transparent 50%');
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}


		}
	};
}]);

Gui2DComponents.controller('SwitchController', function($scope) {
	$scope.status = 0;
	$scope.ngModel = 0;
	$scope.init = function() {
		$scope.switchOn = 0;
		$scope.switchOff = 1;
		$scope.status = 0;
	};
	$scope.onOff = function() {
		if($scope.status === 0) {
			$scope.switchOn = 1;
			$scope.switchOff = 0;
			$scope.status = 1;
		} else {
			$scope.switchOn = 0;
			$scope.switchOff = 1;
			$scope.status = 0;
		}

	};
});

Gui2DComponents.directive('switch', ['$document', function($document){
		return {
			require : '?ngModel',	
			restrict: 'E',
			replace: true,
			templateUrl: "bower_components/gui-2d-components/src/js/templates/switch.html",
			scope: {color: "@", ngModel: "="},
			controller: 'SwitchController',
			link: function(scope, element, attr, ngModel) {
				//ngModel.$setViewValue(scope.status);
				element.bind('click', function() {
					scope.$apply(setStatus());
				});

				setStatus = function() {
					ngModel.$setViewValue(scope.status);
				};
			}
		};
}]);
