'use strict';

/**
 * Socket
 */
var chatroom = require('../models/socketModels/chatroom');

module.exports = function(io) {

	io.sockets.on('connection', function(socket){

		socket.on('userConnect', function(data){
			console.log(data.user_id, data.chatroom_id);
		});

	});

};