'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Chatroom	= mongoose.model('Chatroom'),
    Message		= mongoose.model('Message');

exports.chatroom = function(req, res, next, id) {
	Chatroom.findOne({
            _id: id
        })
        .exec(function(err, room) {
            if (!room) req.chatroom = null;
            req.chatroom = room;
            next();
        });
};

exports.getChatroom = function(req, res) {
	if(req.chatroom != null) {
		var room = req.chatroom;

		Message.find({
			chatroom_id: req.chatroomId
		}).exec(function(err, messages){
			if(!err) {
				room.messages = messages;
				res.jsonp({chatroom : room});
			}
		});

	} else {
		res.jsonp({chatroom : false});
	}
};

exports.create = function(req, res, next) {
	var chatroom = new Chatroom(req.body);
	chatroom.save(function(err, room){
		var response = {};
		if (err) {
	        switch (err.code) {
	            case 11000:
	            case 11001:
	                response.message = 'Lijst bestaat al';
	                break;
	            default:
	                response.message = 'Vul aub alle velden in';
	        }
	        response.success = false;
	    } else {
	    	response.success = true;
	    	response.id 	 = room._id;
	    }
	    
	    res.jsonp(response);
	});
};

exports.addUser = function(req, res, next) {
	Chatroom.findOne({
		id: req.chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i].user_id == req.user_id) {
					res.jsonp({success : false});
				}
			};

			users[users.length] = req.user_id;
			res.jsonp({success : true});
		}
	});
};

exports.removeUser = function(req, res, next) {
	Chatroom.findOne({
		id: req.chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i].user_id == req.user_id) {
					users.splice(i, 1);
					res.jsonp({success : true});
				}
			};
		}
		res.jsonp({success : false});
	});
};

exports.delete = function(req, res, next, id) {
	Chatroom.findOne({
		id: id
	})
	.remove()
	.exec(function(err){
		if(err) {
			res.render('error', { status : 500 } );
		}
	});
};