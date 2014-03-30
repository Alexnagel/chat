'use strict';

/**
 * Socket
 */

module.exports = function(io) {
	var chatroom = require('../models/zocketModels/chatroom');

	io.sockets.on('connection', function(socket){

		socket.on('userConnect', function(data){
			socket.user_id 		= data.user_id;
			socket.chatroom_id 	= data.chatroom_id;

			chatroom.addUser(data.chatroom_id, data.user_id);

			chatroom.getUsers(data.chatroom_id, function(result){
				socket.emit('userConnected', { users: result });
			});

			// Emit user to other sockets
			chatroom.getUser(data.user_id, function(err, user){
				if(!err) {
					io.sockets.emit('newUserConnected', {chatroom_id: data.chatroom_id, user: user});
				}
			});
		});

		socket.on('disconnect', function(){
			chatroom.removeUser(socket.chatroom_id, socket.user_id);
			io.sockets.emit('userDisconnected', {chatroom_id: socket.chatroom_id, user_id: socket.user_id});
		});

		socket.on('addMessage', function(data){
			chatroom.addMessage(data.message);
			io.sockets.emit('newMessage', message);
		});
	});

};