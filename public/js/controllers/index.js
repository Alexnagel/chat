'use strict';

angular.module('chat.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.editProfile = function() {
    	console.log("Edit");
    }
}]);