'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    crypto   = require('crypto');

/**
 * The Message Schema
 */
var MessageSchema = new Schema({
	chatroom_id: {
		type: Number,
		required: true
	},
	user_id: {
		type: Number,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	timestamp: Date
});

/**
 * Validation
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

MessageSchema.path('content').validate(function(content){
	return (typeof content === 'string' && content.length > 0);
}, 'Bericht mag niet leeg zijn');

mongoose.model('Message', MessageSchema);