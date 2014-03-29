'use strict';

angular.module('chat.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '',
        'link': ''
    }];

    $scope.submit = function() {
    	if($scope.username && $scope.password) {
    		SignAuth.login({username: $scope.username, password: $scope.password});
    	}
    };
    
    $scope.isCollapsed = false;
}]);