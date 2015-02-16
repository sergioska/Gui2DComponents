'use strict';

describe('Gui2DComponents: selector', function() {
	var element, scope, html, $httpBackend;
	beforeEach(module('templates'));
	beforeEach(module('Gui2DComponents'));

	beforeEach(inject(function($rootScope, $compile) {

		scope = $rootScope.$new();

		html = '<selector id="due" position="{{position}}" color="{{color}}" label="{{label}}"></selector>';
		element = html;

		scope.position = 5;
		scope.color = "blue";
		scope.label = "type";
		scope.model = "type";

		element = $compile(element)(scope);
		scope.$digest();
	}));

	describe('test first position', function() {
		it("should be position=5, color=blue, label=type", function() {
			var ele = element.isolateScope();
			expect(ele.position).toBe('5');
			expect(ele.color).toBe('blue');
			expect(ele.label).toBe('type');

		});
	});

});