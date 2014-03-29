'use strict';

//Global service for global variables
angular.module('chat.system').factory('SignInAuth', ['$resource', function($resource) {
	return $resource('users/session', null, 
		{
			'login': { method:'POST' }
		});
}]);