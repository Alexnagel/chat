'use strict';

//Global service for global variables
angular.module('chat.system').factory('SignAuth', ['$resource', function($resource) {
	return $resource('users/session', null, 
		{
			{'login': { method:'PUT', params:{newUser:false}, {userID:@_id}}},
    		{'post': { method:'PUT', params:{newUser:true}}}
		});
}]);