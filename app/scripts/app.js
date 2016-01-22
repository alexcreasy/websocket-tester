'use strict';

/**
 * @ngdoc overview
 * @name websocketTesterApp
 * @description
 * # websocketTesterApp
 *
 * Main module of the application.
 */
angular
  .module('websocketTesterApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-websocket'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
