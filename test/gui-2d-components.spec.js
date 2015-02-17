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
			//scope.$digest();
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

			element.triggerHandler('mousedown');
			element.triggerHandler('mousemove');
			element.triggerHandler('event.pageY');
			
			//expect(element.dataPrevY).toBe('100');

		});
	});

	describe('Gui2DComponents: switch', function() {
		var element, html;

		beforeEach(function() {
					//console.log(scope);
			html = '<switch id="tre"></switch>';
			element = $compile(html)(scope);

			scope.model = "switchValue";
			scope.switchOn = 0;
			scope.switchOff = 1;

			scope.$digest();

		});

		describe('test status', function() {
			it("test start position", function() {
				//scope.$digest();
				var ele = element.isolateScope();
				console.log(ele);
				//expect(scope.switchValue).toBe('0');
			});
		});
	});

});