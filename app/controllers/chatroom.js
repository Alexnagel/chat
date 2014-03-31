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
		.populate('users')
		.populate('messages')
        .exec(function(err, room) {
            console.log(err, room);
            if (!room) req.chatroom = null;
            req.chatroom = room;
            next();
        });
};

exports.getChatrooms = function(req, res, next) {
	Chatroom.find().sort('-created').populate('users', 'name username').exec(function(err, chatrooms) {
        if (err) {
            res.jsonp([]);
        } else {
            res.jsonp(chatrooms);
        }
    });
};

exports.getChatroom = function(req, res) {
	if(req.chatroom != null) {
		var room = req.chatroom;
		res.jsonp(room);
	} else {
		res.jsonp(false);
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

exports.destroy = function(req, res, next) {
	var chatroom = req.chatroom;

	chatroom.remove();
};