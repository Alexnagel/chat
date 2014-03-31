'use strict';

angular.module('chat.system').controller('SignUpController', ['$scope', '$location', 'Global', 'SignUpAuth', function ($scope, $location, Global, SignUpAuth) {
    $scope.global = Global;
	$scope.message = "";
	
	// Resetting the fields
	$scope.fullname = null;
	$scope.email = null;
	$scope.username = null;
	$scope.password = null;

    $scope.submit = function(fullname, email, username, password) { 
    	if(fullname && email && username && password) {
    		SignUpAuth.create({name: fullname, email: email, username: username, password: password}, function(user) {
                if(user != null) {
				  if(user[0] != 'f') {
                    window.user = user;
                    Global.user = user;
                    Global.authenticated = true;

                    $location.path('/').replace();
				  } else {
					$scope.message = "User bestaat al!";
				  }
                }
            });
    	}
    };
    
	
    $scope.isCollapsed = false;
}]);