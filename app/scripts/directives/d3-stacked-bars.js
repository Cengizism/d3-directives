'use strict';

angular.module('d3StackedBarsApp')
  .directive('d3StackedBars', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the d3StackedBars directive');
      }
    };
  });
