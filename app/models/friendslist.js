'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    crypto   = require('crypto');

/**
 * The FriendsList Schema
 */
var FriendsListSchema = new Schema({
	user_id: {
		type: Number,
		required: true
	},
	friends: {
		friend_id: Number
	}
});

mongoose.model('FriendsList', FriendsListSchema);