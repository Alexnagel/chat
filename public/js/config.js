'use strict';

//Setting up route
angular.module('chat').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          "indexPanel" : {
            templateUrl: "views/index.html",
            controller: "IndexController"
          }
        }
    })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html'
      });
}
]);

//Setting HTML5 Location Mode
angular.module('chat').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
