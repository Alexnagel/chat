'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Chatroom	= mongoose.model('Chatroom');

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

exports.addUser = function(req, res, next) {
	Chatroom.findOne({
		id: req.chatroom_id
	})
	.exec(function(err, room){
		if(!err) {
			var users = room.users;

			for (var i = users.length - 1; i >= 0; i--) {
				if( users[i].user_id == req.user_id) {
					res.render('error', {status: 500});
				}
			};

			users[users.length] = req.user_id;
			
		}
	});
}

exports.create = function(req, res, next) {
	var chatroom = new Chatroom(req.body);
	chatroom.save(function(err){
		if (err) {
	        switch (err.code) {
	            case 11000:
	            case 11001:
	                message = 'Lijst bestaat al';
	                break;
	            default:
	                message = 'Vul aub alle velden in';
	        }

	        res.render('error', {
	            status: 500
	        });
	    }
	    res.jsonp(chatroom);
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