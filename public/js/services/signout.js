'use strict';

//Global service for global variables
angular.module('chat.system').factory('SignOutAuth', ['$resource', function($resource) {
	return $resource('/signout', null, 
		{
			'logout': { method:'GET' }
		});
}]);