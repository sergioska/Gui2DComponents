var testGui = angular.module('testGui', ['Gui2DComponents']);

testGui.controller('MainController', function($scope){
	$scope.init = function() {
		$scope.gain = 40;
		$scope.gain2 = 60;
		$scope.hi = 0.7;
		$scope.type = 0;
		$scope.subtype = 0;
		$scope.another = 0;
		$scope.switchStatus=0;
	}
	$scope.$watch(function() {
		console.log($scope.gain);
	});
	$scope.$watch(function() {
		console.log($scope.pan);
	});
});