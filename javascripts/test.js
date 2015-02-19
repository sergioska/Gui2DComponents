var testGui = angular.module('testGui', ['Gui2DComponents']);

testGui.controller('MainController', function($scope){
	$scope.init = function() {
		$scope.gain = 0;
		$scope.switchStatus=0;
	}
	$scope.$watch(function() {
		console.log($scope.gain);
	});
	$scope.$watch(function() {
		console.log($scope.pan);
	});
});