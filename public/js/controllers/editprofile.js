'use strict';

angular.module('chat.system').controller('EditProfileController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.submit = function() {
    	console.log(Global.user);
	    Global.user.name = $scope.fullname;
	    Global.user.username = $scope.username;
	    Global.user.email = $scope.email;
	    Global.user.description = $scope.description;
	    Global.user.image = $scope.imageURL;
    	console.log(Global.user);
    	
    	Global.user.$save();
    };

    $scope.fullname = Global.user.name;
    $scope.username = Global.user.username;
    $scope.email = Global.user.email;
    $scope.description = Global.user.description;
    $scope.imageURL = Global.user.image;

}]);