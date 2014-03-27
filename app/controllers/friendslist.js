'use strict';

/**
 * Module dependencies.
 */
var mongoose 	= require('mongoose'),
    Friendslist = mongoose.model('FriendsList');

exports.friendslist = function(req, res, next, id) {
	Friendslist.findOne({
            user_id: id
        })
        .exec(function(err, list) {
            if (err) return next(err);
            if (!list) return next(new Error('Failed to load Friendslist of user: ' + id));
            req.friendslist = list;
            next();
        });
};

exports.create = function(req, res, next) {
	var list 	= new FriendsList(req.body);
	var message = null;

	list.save(function(err) {
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
        res.jsonp(list);
    });
};

exports.update = function(req, res, next, id) {
	Frienslist.findOne({ user_id: id }, function(err, list){
        list.friends = req.body;
        list.save();
    });
};