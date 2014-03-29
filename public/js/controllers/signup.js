'use strict';

angular.module('chat.system').controller('SignUpController', ['$scope', '$state', 'Global', 'SignUpAuth', function ($scope, $state, Global, SignUpAuth) {
    $scope.global = Global;

    
    $scope.submit = function() { 
    	if($scope.fullname && $scope.email && $scope.username && $scope.password) {
    		SignUpAuth.create({name: $scope.fullname, email: $scope.email, username: $scope.username, password: $scope.password}, function(user) {
                if(user != null) {
                    var tmpUser = { __v: user.__v,
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                provider: user.provider,
                                username: user.username};

                    window.user = tmpUser;
                    Global.user = tmpUser;
                    Global.authenticated = true;

                    $state.transitionTo("loggedIn");
                }
            });
    	}
    };
    
    $scope.isCollapsed = false;
}]);