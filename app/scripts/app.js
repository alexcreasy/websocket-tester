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
  .config(function ($routeProvider, $provide) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

      $provide.decorator('$exceptionHandler', function($delegate, $injector){
          return function(exception, cause){
              var $rootScope = $injector.get('$rootScope');
              console.log('toplevel exception: %O, %O', exception, cause);
              $rootScope.$broadcast('ADD_LOG_LINE', '*** Error: ' + exception + ' : ' + cause);
              $delegate(exception, cause);
          };
      });

  });
