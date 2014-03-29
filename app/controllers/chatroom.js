'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Chatroom	= mongoose.model('Chatroom'),
    Message		= mongoose.model('Message');

exports.chatroom = function(req, res, next, id) {
	Chatroom.findOne({
            id: id
        })
        .exec(function(err, room) {
            if (err) return next(err);
            if (!room) return next(new Error('Failed to load Chatroom with id: ' + id));
            req.chatroom = room;
            next();
        });
};

exports.getChatroom = function(req, res) {
	Chatroom.findOne({
		id: req.chatroomId
	})
	.exec(function(err, room){
		if(!err) {
			Message.find({
				chatroom_id: req.chatroomId
			}).exec(function(err, messages){
				if(!err) {
					room.messages = messages;
					res.jsonp(room);
				}
			});
		}
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
}

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