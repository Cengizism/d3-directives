'use strict';

angular.module('d3App', [
  'd3App.directives',
  // 'ngCookies',
  // 'ngResource',
  // 'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
