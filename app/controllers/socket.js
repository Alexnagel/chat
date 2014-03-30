'use strict';

/**
 * Socket
 */
var chatroom = require('chatroom';)

module.exports = function(io) {

	io.sockets.on('connection', function(socket){
		console.log('connected');
		socket.on('userConnect', function(data){
			console.log(data.user_id, data.chatroom_id);
		});

	});

};