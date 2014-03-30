'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', 'SignInAuth', 'SignOutAuth', function ($scope, Global, SignInAuth, SignOutAuth) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Chatroom',
        'link': 'chatroom/1'
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
                window.user = null;
                Global.user = null;
                Global.authenticated = false;
            });
        }
    };

    $scope.isCollapsed = false;
}]);