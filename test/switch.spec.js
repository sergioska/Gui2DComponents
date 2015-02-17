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
		beforeEach(inject(function($controller) {

			controller = $controller('SwitchController', {$scope: scope});
			scope.$digest();

			html = angular.element('<switch id="tre"></switch>');
			element = $compile(html)(scope);

			scope.model = "switchValue";
			scope.switchOn = 0;
			scope.switchOff = 1;
			scope.init();
		}));

		it("test start position", function() {
			var ele = element.isolateScope();
			expect(scope.status).toBe(0);
		});

		it("test on action", function() {
			var ele = element.isolateScope();
			scope.onOff();
			expect(scope.status).toBe(1);
		});

		it("test off action", function() {
			var ele = element.isolateScope();
			scope.status = 1;
			scope.onOff();
			expect(scope.status).toBe(0);
		});

	});
});