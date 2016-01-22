"use strict";angular.module("websocketTesterApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","angular-websocket"]).config(["$routeProvider","$provide",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.decorator("$exceptionHandler",["$delegate","$injector",function(a,b){return function(c,d){var e=b.get("$rootScope");console.log("toplevel exception: %O, %O",c,d),e.$broadcast("ADD_LOG_LINE","*** Error: "+c+" : "+d),a(c,d)}}])}]),angular.module("websocketTesterApp").controller("MainCtrl",["$window","$rootScope","$log","$websocket",function(a,b,c,d){function e(a){b.$broadcast("ADD_LOG_LINE",a)}var f,g;f=this,f.connect=function(a){try{g=d(a)}catch(b){return void e("*** Error: "+b.message)}g.onOpen(function(){e("*** Connected to: "+a)}),g.onClose(function(){e("*** Disconnected from: "+a)}),g.onError(function(){e("*** Error: Check browser console for more information")}),g.onMessage(function(a){e("->"+a.data)})},f.disconnect=function(){g.close()},f.send=function(a){g.send(a).then(function(){e("<-"+a)})}}]),angular.module("websocketTesterApp").directive("displayLog",function(){return{restrict:"EA",scope:{},link:function(a,b){function c(a,c){b.append(c+"<br>")}a.$on("ADD_LOG_LINE",c)}}}),angular.module("websocketTesterApp").run(["$templateCache",function(a){a.put("views/main.html",'<div ng-controller="MainCtrl as ctrl"> <div class="row"> <div class="col-md-12"> <div class="input-group"> <input type="text" class="form-control" id="url" ng-model="url" placeholder="Enter WebSocket URL..."> <span class="input-group-btn"> <button class="btn btn-default" type="button" ng-click="ctrl.connect(url)">Connect</button> </span> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="log-console well well-sm" data-display-log> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="input-group"> <input type="text" class="form-control" ng-model="message" placeholder="Send on WebSocket..."> <span class="input-group-btn"> <button class="btn btn-default" ng-click="ctrl.send(message)" type="button">Send</button> </span> </div> </div> </div> </div>')}]);