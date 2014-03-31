'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', 'SignInAuth', 'SignOutAuth', 'GetUser', function ($scope, Global, SignInAuth, SignOutAuth, GetUser) {
  $scope.global = Global;

  $scope.menu = [{
    'title': 'Chatrooms',
    'link': 'chatrooms'
  },{
    'title': 'New Chatroom',
    'link': 'chatrooms/new'
  }];

  $scope.submit = function() {
  	if($scope.username && $scope.password) {
  		SignInAuth.login({username: $scope.username, password: $scope.password}, function(user) {
        if(user != null) {
          window.user = user;
          Global.user = user;
          Global.authenticated = true;
          
          // Resetting the fields
          $scope.username = null;
          $scope.password = null;
        }
      });
  	}
  };

  $scope.signOut = function() {
    if(Global.authenticated) {
      SignOutAuth.logout(function() {
        window.user = false;
        Global.user = false;
        Global.authenticated = false;
      });
    }
  };

  Global.user = GetUser.get(function(user){
    if(user)
    {
      window.user = user;
      Global.user = user;
      Global.authenticated = true;
    } else {
      window.user = false;
      Global.user = null;
      Global.authenticated = false;
    }
  });

  $scope.isCollapsed = false;
}]);