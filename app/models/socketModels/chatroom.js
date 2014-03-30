'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Chatroom	= mongoose.model('Chatroom'),
    Message		= mongoose.model('Message');

exports.addUser = function(chatroom_id, user_id) {
	Chatroom.findOne({
		_id: chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i].user_id == user_id) {
					return {success : false};
				}
			};

			users[users.length] = user_id;
			console.log(users);

			room.save();

			return {success : true};
		}
		return false;
	});
};

exports.removeUser = function(chatroom_id, user_id) {
	Chatroom.findOne({
		_id: chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i].user_id == user_id) {
					users.splice(i, 1);

					room.save();

					return {success : true};
				}
			};
		}
		return {success : false};
	});
};