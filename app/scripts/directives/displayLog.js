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
    'use strict';

    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element) {

        function addToLog(event, payload) {
          element.append(payload + '<br>');
        }
        // for (var i = 0; i < 50; i++) {
        //   addToLog({}, '->Testing Testing Testing Testing Testing Testing ');
        //   addToLog({}, '->Loud and clear Loud and clear Loud and clear');
        // }
        scope.$on('ADD_LOG_LINE', addToLog);
      }
    };

});
