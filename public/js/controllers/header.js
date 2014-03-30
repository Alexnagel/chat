'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', 'SignInAuth', 'SignOutAuth', function ($scope, Global, SignInAuth, SignOutAuth) {
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
                    var tmpUser = { __v: user.__v,
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                provider: user.provider,
                                username: user.username};

                    window.user = tmpUser;
                    Global.user = tmpUser;
                    Global.authenticated = true;
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