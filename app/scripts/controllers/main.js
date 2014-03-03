'use strict';

angular.module('d3App')
  .controller('MainCtrl', function ($scope)
  {
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





    var resultsA = {
      facets: {
        Product : {
            _type : "terms",
            missing : 0,
            total : 454,
            other : 0,
            terms : [{
              term : "Prod-A",
              count : 306
            },{
              term : "Prod-B",
              count : 148
            },{
              term : "Prod-C",
              count : 62
            }]
        },
        Sex : {
            _type : "terms",
            missing : 0,
            total : 454,
            other : 0,
            terms : [{
              term : "Male",
              count : 36
            },{
              term : "Female",
              count : 148
            }]
        },
        Times : {
          _type: "date_histogram",
          entries : [{
            time : 1341100800000,
            count : 9
          }, {
            time : 1343779200000,
            count : 32
          }, {
            time : 1346457600000,
            count : 78
          }, {
            time : 1349049600000,
            count : 45
          }, {
            time : 1351728000000,
            count : 134
          }]
        }
      }
    };

    var resultsB = {
      facets: {
        Product : {
            _type : "terms",
            missing : 0,
            total : 454,
            other : 0,
            terms : [{
              term : "Prod-A",
              count : 306
            },{
              term : "Prod-B",
              count : 148
            },{
                  term : "Prod-C",
                  count : 0
              }]
        },
        Sex : {
            _type : "terms",
            missing : 0,
            total : 454,
            other : 0,
            terms : [{
              term : "Male",
              count : 36
            }]
        },
        Times : {
          _type: "date_histogram",
          entries : [{
            time : 1341100800000,
            count : 9
          }, {
            time : 1343779200000,
            count : 32
          }, {
            time : 1346457600000,
            count : 78
          }]
        }
      }
    };

    $scope.filterSearchA = function(type, term) {
        switch(currentResults) {
            case 'A':
                $scope.results = resultsB;
                currentResults = 'B';
                break;
            case 'B':
                $scope.results = resultsA;
                currentResults = 'A';
                break;
        }
    };

    $scope.results = resultsA;
    var currentResults = 'A';




  });




