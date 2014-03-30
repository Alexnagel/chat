'use strict';

//Global service for global variables
angular.module('chat.system').factory('SignInAuth', ['$resource', function($resource) {
	return $resource('users/session', null, 
		{
			'login': { method:'POST' }
		});
}]);

//Global service for global variables
angular.module('chat.system').factory('SignOutAuth', ['$resource', function($resource) {
	return $resource('/signout', null, 
		{
			'logout': { method:'GET' }
		});
}]);

//Global service for global variables
angular.module('chat.system').factory('SignUpAuth', ['$resource', function($resource) {
	return $resource('users', null, 
		{
    		'create': { method:'POST' }
		});
}]);