'use strict';

angular.module('chat.system').controller('EditProfileController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.submit = function() {
    	console.log("Save?");
    };

    $scope.fullname = Global.user.name;
    $scope.username = Global.user.username;
    $scope.email = Global.user.email;
    $scope.description = Global.user.description;
    $scope.imageURL = Global.user.image;
}]);