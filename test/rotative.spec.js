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
		var  html, element;
		beforeEach(function() {
			html = '<selector id="due" position="{{position}}" color="{{color}}" label="{{label}}"></selector>';
			element = $compile(html)(scope);

			scope.position = 5;
			scope.color = "blue";
			scope.label = "type";
			scope.$digest();

		});
		
		it("should be position=5, color=blue, label=type", function() {
			var ele = element.isolateScope();
			expect(ele.position).toBe('5');
			expect(ele.color).toBe('blue');
			expect(ele.label).toBe('type');
		});

		it("test mouse move", function() {
			var ele = element.isolateScope();

			//element.triggerHandler('mousedown');
			//element.triggerHandler('mousemove');
			//element.triggerHandler('event.pageY');
			
			//expect(element.dataPrevY).toBe('100');

		});
	});

});