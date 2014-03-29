'use strict';

angular.module('chat.system').controller('SignUpController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    
    $scope.submit = function() { 
    	if($scope.fullname && $scope.email && $scope.username && $scope.password) {
    		SignAuth.post({fullname: $scope.fullname, email: $scope.email, username: $scope.username, password: $scope.password});
    	}
    };
    
    $scope.isCollapsed = false;
}]);