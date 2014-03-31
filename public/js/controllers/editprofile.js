'use strict';

angular.module('chat.system').controller('EditProfileController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.submit = function(fullname, username, email, description, imageURL) {
	    Global.user.name = fullname;
	    Global.user.username = username;
	    Global.user.email = email;
	    Global.user.description = description;
	    Global.user.image = imageURL;
    	
    	Global.user.$save();
    };

    $scope.fullname = Global.user.name;
    $scope.username = Global.user.username;
    $scope.email = Global.user.email;
    $scope.description = Global.user.description;
    $scope.imageURL = Global.user.image;

}]);