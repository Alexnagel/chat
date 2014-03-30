'use strict';

/**
 * Module dependencies.xcxcx
 */
var mongoose 	= require('mongoose'),
    Chatroom	= mongoose.model('Chatroom'),
    Message		= mongoose.model('Message'),
    User 		= mongoose.model('User');

exports.getUsers = function(chatroom_id, callback) {
	var result = false;
	Chatroom.findOne({ _id: chatroom_id})
	.populate('users')
	.exec(function(err, room){
		if(!err) {
			result = room.users;
		}
		callback(result);
	});
};

exports.addUser = function(chatroom_id, user_id, callback) {
	Chatroom.findById(chatroom_id, function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i] == user_id) {
					return {success : false};
				}
			};

			users.push(user_id);
			room.users = users;
			room.save();

			return {success : true};
		}
		return {success : false };
	});
};

exports.removeUser = function(chatroom_id, user_id) {
	console.log(chatroom_id);
	Chatroom.findOne({
		_id: chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i] == user_id) {
					users.splice(i, 1);

					room.save();

					return {success : true};
				}
			};
		}
		return {success : false};
	});
};

exports.getUser = function(user_id, callback) {
	User.findOne({_id : user_id})
	.exec(callback)
};

exports.addMessage = function(message) {
	var message = new Message(message);

	message.save(function(err){
		if(err) {
			return false;
		}
	});
};