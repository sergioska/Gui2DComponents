'use strict';

describe('Gui2DComponents: rotative/selector', function() {
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
		var  html, element, controller, doc;
		beforeEach(inject(function($controller, $document) {
			doc = $document;
			html = angular.element('<rotative id="uno" min="{{min}}" max="{{max}}" step="{{step}}" label="{{lable}}" color="{{color}}"></rotative>');
			element = $compile(html)(scope);
			controller = $controller('RotativeController', {$scope: scope, $element: element});

			scope.min = 0;
			scope.max = 100
			scope.step = 1;
			scope.color = "blue";
			scope.label = "type";
			scope.$digest();

		}));

		it("should be init state", function() {
			var ele = element.isolateScope();
			expect(parseInt(ele.min)).toBe(0);
			expect(parseInt(ele.max)).toBe(100);
			expect(parseInt(ele.step)).toBe(1);
			expect(parseInt(scope.getValue())).toBe(0);
			console.log(scope.getValue());
		});

		it("test action", function() {
			//var ele = element.isolateScope();""
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 100,
				pageY: 30000
			});
			//scope.$digest();
			//console.log(ele);
			console.log(scope.getValue());
		});

	});

	describe('test selector component', function() {
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

			element.triggerHandler('mousedown');
			element.triggerHandler('mousemove');
			element.triggerHandler('event.pageY');
			
			//expect(element.dataPrevY).toBe('100');

		});
	});

});