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

exports.addUser = function(chatroom_id, user, callback) {
	Chatroom.findOne({ _id: chatroom_id})
	.populate('users')
	.exec(function(err, room){
		if(room != null) {
			var users = room.users;
		}

		if(!err) {
			var pushName = true;
			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i]._id == user._id) {
					pushName = false;
				}
			};

			if(pushName) {
				users.push(user);
				room.users = users;
				room.save();
			}
		}
		callback(users);
	});
};

exports.removeUser = function(chatroom_id, user_id) {
	console.log(chatroom_id);
	Chatroom.findOne({
		_id: chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			if (room != null) {
				var users = room.users;

				for (var i = users.length - 1; i >= 0; i--) {
					if( users[i] == user_id) {
						users.splice(i, 1);

						room.save();

						return {success : true};
					}
				};
			}
		}
		return {success : false};
	});
};

exports.getUser = function(user_id, callback) {
	User.findOne({_id : user_id})
	.exec(callback);
};

exports.addMessage = function(message, callback) {
	var message = new Message(message);

	message.save(function(err, message){
		if(err) {
			return false;
		} else {

			Chatroom.findOne({ _id: message.chatroom_id})
			.populate('messages')
			.exec(function(err, room){
				console.log(err, room);
				for (var i = room.messages.length - 1; i >= 0; i--) {
					if( room.messages[i]._id == message._id) {
						return false;
					}
				};
				room.messages.push(message);
				room.save();
				callback();
			});
		}
	});
};