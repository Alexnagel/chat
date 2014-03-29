'use strict';

//Global service for global variables
angular.module('chat.system').factory('SignUpAuth', ['$resource', function($resource) {
	return $resource('users', null, 
		{
    		'create': { method:'POST' }
		});
}]);