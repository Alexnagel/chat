'use strict';

angular.module('chat.system').controller('ChatController', ['$scope', '$stateParams', '$rootScope', '$location', 'Global', 'Chatrooms', 'socket', 
                                                                    function ($scope, $stateParams, $rootScope, $location, Global, Chatrooms, socket) {
    $scope.global = Global;

    /**
     * userUpdate
     * Gets called when the users for the chatroom need an update
     * @param mixed data Contains the chatroom_id and the users array
     */
    socket.on('userUpdate', function(data){
        if($scope.chatroom._id == data.chatroom_id && data.users != false) {
            $scope.users = data.users;
        }
    });

    /**
     * userDisconnect
     * Gets called when a user leaves the chatroom
     * @param  mixed data Contains the user_id and chatroom_id where the user left
     */
    socket.on('userDisconnect', function(data){
        if($scope.chatroom._id == data.chatroom_id) {
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if($scope.users[i]._id = data.user_id)
                {
                    $scope.users.split(i, 1);
                }
            };
        }
    });

    /**
     * newMessage
     * Gets called when a new message is emited
     * @param  mixed data Contains the message and the chatroom_id
     */
    socket.on('newMessage', function(message){
        if (message.chatroom_id == $scope.chatroom._id) {
            $scope.messages.push(message);
        }
    });

    /**
     * The on stateChangeStart gets called this state is going to be discarded
     * When this happens the user gets disconnected from the socket
     */
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      socket.emit('userDisconnect', { user: $scope.global.user, chatroom_id: $scope.chatroom._id });
    });

    /**
     * addMessage
     * Gets called when the user clicks on the 'send' button
     * The JSON for the message is created and then emited to the server
     * @param String messageContent Contains the message the user wants to send
     */
    $scope.addMessage = function(messageContent){
    	var message = {
            chatroom_id: $scope.chatroom._id,
            user_id: $scope.global.user._id,
            content: messageContent
        };

        socket.emit('addMessage', message);
    };

    /**
     * deleteChat
     * Gets called when the user wants to delete the chat
     * Calls a URL on the server
     */
    $scope.deleteChat = function() {
        $scope.chatroom.$remove();
        $location.path('chatrooms').replace();
    };

    /**
     * getChatroom
     * The initialisation call, gets the chatroom with all info from the server
     * And emits that a new user has joined. If the chat doesn't exist it'll redirect to the homepage
     */
    $scope.getChatroom = function() {
        Chatrooms.get({
            chatroomId: $stateParams.chatroomId
        }, function(room){
            if(room) {
                $scope.chatroom = room;
                $scope.users    = room.users;
                console.log($scope.users);
                $scope.messages = room.messages;

                socket.emit('userConnect', { user: $scope.global.user, chatroom_id: $scope.chatroom._id });
            } else {
                $location.path('/').replace();
            }
        });
    };
}]);