'use strict';

/**
 * Socket
 */

module.exports = function(io) {
	var chatroom = require('../models/zocketModels/chatroom');

	io.sockets.on('connection', function(socket){
		
		socket.on('userConnect', function(data){
			socket.user_id 		= data.user._id;
			socket.chatroom_id 	= data.chatroom_id;

			chatroom.addUser(data.chatroom_id, data.user, function(result){
				io.sockets.emit('userUpdate', { chatroom_id: data.chatroom_id, users: result });
			});
		});

		socket.on('userDisconnect', function(){
			chatroom.removeUser(socket.chatroom_id, socket.user_id);
			io.sockets.emit('userDisconnected', {chatroom_id: socket.chatroom_id, user_id: socket.user_id});
		});

		socket.on('addMessage', function(data){
			chatroom.addMessage(data, function(){
				io.sockets.emit('newMessage', data);
			});
			
		});
	});

};