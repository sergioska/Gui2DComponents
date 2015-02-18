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
			//scope.$digest();

			scope.min = 0;
			scope.max = 100
			scope.step = 1;
			scope.color = "blue";
			scope.label = "type";
			//scope.$digest();

		}));

		it("should be init state", function() {
			scope.$digest();
			var ele = element.isolateScope();
			expect(parseInt(ele.min)).toBe(0);
			expect(parseInt(ele.max)).toBe(100);
			expect(parseInt(ele.step)).toBe(1);
			expect(parseInt(ele.out)).toBe(94);
			//console.log("OK " + scope.test);

		});

		it("test action", function() {
			
			console.log("testing mouse action ...");
			scope.$digest();
			var ele = element.isolateScope();

			// a first mouse move up
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 300
			});
			doc.triggerHandler('mouseup');
			console.log("DEG: " + ele.out);

			// second mouse move up
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 200
			});
			doc.triggerHandler('mouseup');
			console.log("DEG: " + ele.out);

			// another mouse move up
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 100
			});
			doc.triggerHandler('mouseup');
			console.log("DEG: " + ele.out);

			// start mouse move down (return to start point)
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 500
			});
			doc.triggerHandler('mouseup');
			console.log("DEG: " + ele.out);

			// ... mouse move down
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 800
			});
			doc.triggerHandler('mouseup');
			console.log("DEG: " + ele.out);

			// ... mouse move down (start point)
			element.triggerHandler('mousedown');
			doc.triggerHandler({
				type: "mousemove",
				pageX: 0,
				pageY: 1000
			});
			doc.triggerHandler('mouseup');
			expect(ele.out).toBe(94);
			
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