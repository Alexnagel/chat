'use strict';

angular.module('chat.system').controller('ChatroomController', ['$scope', '$location', 'Global', 'Chatrooms', 'ChatroomCreate', 'socket', 
                                                                    function ($scope, $location, Global, Chatrooms, ChatroomCreate, socket) {
    $scope.global = Global;

    $scope.title = "Chatroom A";

    $scope.messages = [{
    	content: "dsfdsfsd",
    	user: {name:"leo"}
    },
    {
    	content: "blabllalb",
    	user: {name:"leo"}
    }];

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
        ChatroomCreate.save(null, {
            name:       $scope.chatroomName,
            //owner_id:   $scope.global.user._id;
            owner_id:   1
        }, function(response){
            if(response.success) {
                $location.path('/chatroom/' + response.id).replace();
            } else {
                // TODO
            }
        });
    };

    $scope.getChatroom = function() {
        Chatrooms.get({
            chatroomId: $stateParams.chatroomId
        }, function(chatroom){
            $scope.chatroom = chatroom;

            socket.emit('userConnect', {user_id: $scope.global.user._id});
            socket.on('userConnected', function(data){
                if(data != false) {
                    for (var i = data.messages.length - 1; i >= 0; i--) {
                        setMessage(data.messages[i]);
                    };
                }
            });
        });
    };

    var setMessage = function(data) {

    };
}]);