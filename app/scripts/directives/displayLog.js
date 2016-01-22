'use strict';

/**
 * @ngdoc directive
 * @name websocketTesterApp:displayLog
 * @restrict EA
 * @description
 * @example
 * @author Alex Creasy
 */
angular.module('websocketTesterApp')
  .directive('displayLog', function() {

    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element) {

        function addToLog(event, payload) {
          element.append(payload + '<br>');
        }

        scope.$on('ADD_LOG_LINE', addToLog);
      }
    };

});
