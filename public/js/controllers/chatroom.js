'use strict';

angular.module('chat.system').controller('ChatroomController', ['$scope', '$stateParams', '$location', '$modal', 'Global', 'Chatrooms', 'ChatroomCreate', 'AllChatrooms', 
                                                                    function ($scope, $stateParams, $location, $modal, Global, Chatrooms, ChatroomCreate, AllChatrooms) {
    $scope.global = Global;

    /**
     * allChatrooms
     * Gets all the chatrooms in from the server
     * Makes use of AllChatrooms service
     */
    $scope.allChatrooms = function() {
        AllChatrooms.query(function(response){
            $scope.chatrooms = response;
        });
    };

    
    /**
     * createChatroom
     * Creates a new chatroom with the given name
     * If successfull will redirect to the chatroom
     */
    $scope.createChatroom = function(){
        if($scope.chatroomName != "") {
            var chatroom_id = 0;
            ChatroomCreate.save(null, {
                name:       $scope.chatroomName,
                owner_id:   $scope.global.user._id
            }, function(response){
                if(response.success) {
                    $location.path('chatroom/' + response.id).replace();
                } else {
                    // TODO
                }
            });
        }
    };
}]);