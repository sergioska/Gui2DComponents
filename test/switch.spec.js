'use strict';

describe('Gui2DComponents: selector', function() {
	var scope, $rootScope, $compile;
	beforeEach(module('templates'));
	beforeEach(module('Gui2DComponents'));

	beforeEach(inject(function(_$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		// this is very important!!!
		scope = $rootScope;
	}));

	describe('test rotative component', function() {

		var  html, element, controller;
		beforeEach(function() {
			//console.log(scope);
			scope.$digest();

			html = angular.element('<switch id="tre"></switch>');
			element = $compile(html)(scope);
			controller = element.controller('', );

			scope.model = "switchValue";
			scope.switchOn = 0;
			scope.switchOff = 1;
		});

		it("test start position", function() {
			//scope.$digest();
			console.log(controller);
			var ele = element.isolateScope();
			console.log(element);
			expect(scope.switchOff).toBe(1);
		});
	});
});