'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * The Chatroom Schema
 */
var ChatroomSchema = new Schema({
	id: {
		type: Number
	},
	name: {
		type: String,
		required: true
	},
	owner_id: {
		type: String,
		required: true
	},
	description: String,
	users : {
		user_id: Number
	}
});

/**
 * Validation
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

ChatroomSchema.path('name').validate(function(name){
	return (typeof name === 'string' && name.length > 0);
}, 'Naam mag niet leeg zijn');

mongoose.model('Chatroom', ChatroomSchema);