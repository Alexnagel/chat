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
	users : [ { type: Schema.ObjectId, ref: 'User' } ],
	messages : [ { type: Schema.ObjectId, ref: 'Message' } ],
	created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Chatroom', ChatroomSchema);