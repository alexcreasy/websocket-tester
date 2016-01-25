'use strict';

/**
 * @ngdoc function
 * @name websocketTesterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websocketTesterApp
 */
angular.module('websocketTesterApp')
  .controller('MainCtrl', function ($window, $scope, $log, $websocket) {

    var self,
        socket,
        connected;

    self = this;
    connected = false;

    function pushDialogue(message) {
      $scope.$broadcast('ADD_LOG_LINE', message);
    }

    self.connect = function(url) {
      try {
        socket = $websocket(url);
      } catch (e) {
        pushDialogue('*** Error: ' + e.message);
        return;
      }

      socket.onOpen(function() {
        connected = true;
        pushDialogue('*** Connected to: ' + url);
        $scope.$apply();
      });

      socket.onClose(function() {
        connected = false;
        pushDialogue('*** Disconnected from: ' + url);
        $scope.$apply();
      });

      socket.onError(function() {
        pushDialogue('*** Error: Check browser console for more information');
      });

      socket.onMessage(function(message) {
        pushDialogue('->' + message.data);
      });

    };

    self.disconnect = function() {
      socket.close(true);
    };

    self.isConnected = function() {
      return connected;
    };

    self.toggleConnect = function(url) {
      if (!connected) {
        self.connect(url);
      } else {
        self.disconnect();
      }
    };

    self.send = function(message) {
      socket.send(message).then(function() {
        pushDialogue('<-' + message);
      });
    };

  });
