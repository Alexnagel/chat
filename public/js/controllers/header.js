'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', 'SignInAuth', function ($scope, Global, SignInAuth) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '',
        'link': ''
    }];

    $scope.submit = function() {
    	if($scope.username && $scope.password) {
    		SignInAuth.login({username: $scope.username, password: $scope.password}, function(user) {

                var tmpUser = { __v: user.__v,
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                provider: user.provider,
                                username: user.username};

                window.user = tmpUser;
                Global.user = tmpUser;
                Global.authenticated = true;
            });
    	}
    };

    $scope.isCollapsed = false;
}]);