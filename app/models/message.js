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
		type: String,
		required: true
	},
	user_id: { type: Schema.ObjectId, ref: 'User' },
	content: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
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