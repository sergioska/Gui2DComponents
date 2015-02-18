'use strict';

describe('Gui2DComponents: rotative', function() {
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

		}));

		it("should be init state", function() {
			// call $digest before test
			scope.$digest();
			var ele = element.isolateScope();
			expect(parseInt(ele.min)).toBe(0);
			expect(parseInt(ele.max)).toBe(100);
			expect(parseInt(ele.step)).toBe(1);
			expect(parseInt(ele.out)).toBe(94);

		});

		it("test begin of rotation", function() {
			
			console.log("testing mouse action on rotative ...");
			scope.$digest();
			var ele = element.isolateScope();

			var action = function(y) {
				element.triggerHandler('mousedown');
				doc.triggerHandler({
					type: "mousemove",
					pageX: 0,
					pageY: y
				});
				doc.triggerHandler('mouseup');
				return ele.out;
			};

			// mouse move up
			action(300);
			console.log("OUT: " + ele.out);
			// mouse move up
			action(200);
			console.log("OUT: " + ele.out);
			// mouse move up
			action(100);
			console.log("OUT: " + ele.out);
			// mouse move down (return to start point)
			action(500);
			console.log("OUT: " + ele.out);
			// mouse move down
			action(800);
			console.log("OUT: " + ele.out);
			// mouse move down (start point)
			action(1000);
			console.log("OUT: " + ele.out);

			expect(ele.out).toBe(0);
			
		});

		it("test the end of rotation", function() {
			
			console.log("testing mouse action on rotative ...");
			scope.$digest();
			var ele = element.isolateScope();

			var action = function(y) {
				element.triggerHandler('mousedown');
				doc.triggerHandler({
					type: "mousemove",
					pageX: 0,
					pageY: y
				});
				doc.triggerHandler('mouseup');
				return ele.out;
			};

			var output = 0;
			for(var i=200;i>0;i--)
				output = action(i);
			expect(ele.out).toBe(100);

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
			// @todo ...
			element.triggerHandler('mousedown');
			element.triggerHandler('mousemove');
			element.triggerHandler('event.pageY');

		});
	});

});