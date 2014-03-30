'use strict';

angular.module('chat.system').factory('Chatrooms', ['$resource', function($resource) {
    return $resource('chatroom/:chatroomId', {
        chatroomId: '@_id'
    });
}]);

angular.module('chat.system').factory('ChatroomCreate', ['$resource', function($resource) {
    return $resource('chatroom', null);
}]);

angular.module('chat.system').factory('AllChatrooms', ['$resource', function($resource) {
    return $resource('chatrooms', null);
}]);