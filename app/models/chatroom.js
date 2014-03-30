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
	users : [String]
});

mongoose.model('Chatroom', ChatroomSchema);