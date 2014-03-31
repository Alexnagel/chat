'use strict';

angular.module('chat', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'chat.system']);

angular.module('chat.system', [])
  .run(function ($rootScope, $state, Global) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !Global.authenticated){
        // User isn’t authenticated
        $state.transitionTo("home");
        event.preventDefault(); 
      }
    });
  })
  .filter('getName', function() {
    return function(input, id, element) {
      var i=0, len=input.length;
      for (; i<len; i++) {
        console.log(id);
        if (input[i]._id == id[0]._id) {
          console.log(input[i].name, id);
          return input[i].name;
        }
      }
      return null;
    }
  })
  .filter('getImage', function() {
    return function(input, id, element) {
      var i=0, len=input.length;
      for (; i<len; i++) {
        if (input[i]._id == id[0]._id) {

          return input[i].image;
        }
      }
      return null;
    }
  });