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
      socket = $websocket(url);

      socket.onOpen(function() {
        pushDialogue('*** Connected to: ' + url);
      });

      socket.onClose(function() {
        pushDialogue('*** Disconnected from: ' + url);
      });

      socket.onError(function() {
        $log.error('WebSocket Error: %O', arguments);
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
