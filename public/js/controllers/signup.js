'use strict';

angular.module('chat.system').controller('SignUpController', ['$scope', 'Global', 'SignUpAuth', function ($scope, Global, SignUpAuth) {
    $scope.global = Global;

    
    $scope.submit = function() { 
    	if($scope.fullname && $scope.email && $scope.username && $scope.password) {
    		SignUpAuth.create({name: $scope.fullname, email: $scope.email, username: $scope.username, password: $scope.password}, function(user) {
                if(user != null) {
                    window.user = user;
                    Global.user = user;
                    Global.authenticated = true;

                    // Resetting the fields
                    $scope.fullname = null;
                    $scope.email = null;
                    $scope.username = null;
                    $scope.password = null;
                }
            });
    	}
    };
    
    $scope.isCollapsed = false;
}]);