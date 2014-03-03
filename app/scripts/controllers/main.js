'use strict';

angular.module('d3StackedBarsApp')
  .controller('MainCtrl', function ($scope) {

    $scope.stackedBarsData = [
      {
        year: 13,
        preventive: 100,
        corrective: 12
      },
      {
        year: 14,
        preventive: 80,
        corrective: 22
      },
      {
        year: 15,
        preventive: 110,
        corrective: 30
      },
      {
        year: 16,
        preventive: 150,
        corrective: 40
      },
      {
        year: 17,
        preventive: 80,
        corrective: 12
      },
      {
        year: 18,
        preventive: 120,
        corrective: 40
      },
      {
        year: 19,
        preventive: 80,
        corrective: 60
      },
      {
        year: 20,
        preventive: 110,
        corrective: 42
      },
      {
        year: 21,
        preventive: 100,
        corrective: 30
      },
      {
        year: 22,
        preventive: 100,
        corrective: 10
      }
    ];
    
    
    
    
  });
