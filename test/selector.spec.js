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

	describe('test selector component', function() {
		var  html, element, controller, doc;
		beforeEach(inject(function($controller, $document) {
			doc = $document;
			html = angular.element('<selector position="{{position}}" color="{{color}}" label="{{label}}"></selector>');
			element = $compile(html)(scope);
			controller = $controller('RotativeController', {$scope: scope, $element: element});

			scope.position = 3;
			scope.color = "blue";
			scope.label = "type";

		}));

		it("should be init state", function() {
			// call $digest before test
			scope.$digest();
			var ele = element.isolateScope();
			expect(parseInt(ele.position)).toBe(3);
			expect(ele.color).toBe("blue");
			expect(ele.label).toBe("type");
		});

		it("test begin of rotation", function() {
			
			console.log("testing mouse action on selector ...");
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

			// check first position
			for(var i=100;i>90;i--)
				action(i);
			expect(ele.out).toBe(0);

			// check second position
			for(i=90;i>80;i--)
				action(i);
			expect(parseInt(ele.out)).toBe(1);

			// check third position
			for(i=80;i>0;i--)
				action(i);
			expect(parseInt(ele.out)).toBe(2);
		});
	});

});