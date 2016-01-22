'use strict';

/**
 * @ngdoc function
 * @name websocketTesterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websocketTesterApp
 */
angular.module('websocketTesterApp')
  .controller('MainCtrl', function ($window, $rootScope, $log, $websocket) {

    var self,
        socket;

    self = this;

    function pushDialogue(message) {
      $rootScope.$broadcast('ADD_LOG_LINE', message);
    }

    self.connect = function(url) {
      try {
        socket = $websocket(url);
      } catch (e) {
        pushDialogue('*** Error: ' + e.message);
        return;
      }

      socket.onOpen(function() {
        pushDialogue('*** Connected to: ' + url);
      });

      socket.onClose(function() {
        pushDialogue('*** Disconnected from: ' + url);
      });

      socket.onError(function() {
        pushDialogue('*** Error: Check browser console for more information');
      });

      socket.onMessage(function(message) {
        pushDialogue('->' + message.data);
      });

    };

    self.disconnect = function() {
      socket.close();
    };

    self.send = function(message) {
      socket.send(message).then(function() {
        pushDialogue('<-' + message);
      });
    };

  });
