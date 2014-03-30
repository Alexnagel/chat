'use strict';

angular.module('chat.system').controller('ChatroomController', ['$scope', '$stateParams', '$location', '$modal', 'Global', 'Chatrooms', 'ChatroomCreate', 'socket', 
                                                                    function ($scope, $stateParams, $location, $modal, Global, Chatrooms, ChatroomCreate, socket) {
    $scope.global = Global;

    $scope.addMessage = function(){
    	var message = {
            chat_id: $scope.chatroom._id,
            user_id: $scope.global.user._id,
            content: $scope.messageContent,
            timestamp: '20-11-1203'
        };
        socket.emit('addMessage', message);
        setMessage(message);
    };

    $scope.createChatroom = function(){
        if($scope.chatroomName != "") {
            var chatroom_id = 0;
            ChatroomCreate.save(null, {
                name:       $scope.chatroomName,
                owner_id:   $scope.global.user._id
            }, function(response){
                console.log(response);
                if(response.success) {
                    $location.path('chatroom/' + response.id).replace();
                } else {
                    // TODO
                }
            });
        }
    };

    $scope.getChatroom = function() {
        Chatrooms.get({
            chatroomId: $stateParams.chatroomId
        }, function(room){
            if(room.chatroom) {
                $scope.chatroom = room.chatroom;

                socket.emit('userConnect', { user_id: $scope.global.user._id, chatroom_id: $scope.chatroom._id });
                
                socket.on('userConnected', function(data){
                    if(data != false) {

                        if (data.messages.length > 0) {
                            for (var i = data.messages.length - 1; i >= 0; i--) {
                                setMessage(data.messages[i]);
                            };
                        } else 
                            setMessage('No messages in this chat');
                    }
                });
            } else {
                $location.path('/').replace();
            }
        });
    };

    var setMessage = function(data) {

    };
}]);