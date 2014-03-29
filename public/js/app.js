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
  });