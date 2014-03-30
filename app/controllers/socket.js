'use strict';

/**
 * Socket
 */
var chatroom = require('../models/socketModels/chatroom');

module.exports = function(io) {

	io.sockets.on('connection', function(socket){

		socket.on('userConnect', function(data){
			//chatroom.addUser(data.chatroom_id, data.user_id)
			console.log(chatroom.addUser(data.chatroom_id, data.user_id), 'ja');
			// Emit user to other sockets
			io.sockets.emit('newUserConnected', {chatroom_id: data.chatroom_id, user_id: data.user_id});
		});

		socket.on('userDisconnect', function(data){
			chatroom.removeUser(data.chatroom_id, data.user_id);
			io.sockets.emit('userDisconnected', {chatroom_id: data.chatroom_id, user_id: data.user_id});
		});

		socket.on('addMessage', function(data){
			chatroom.addMessage(data.chatroom, data.user_id, data.content);
		});
	});

};