'use strict';

describe('Directive: d3StackedBars', function () {

  // load the directive's module
  beforeEach(module('d3StackedBarsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<d3-stacked-bars></d3-stacked-bars>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the d3StackedBars directive');
  }));
});
