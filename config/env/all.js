'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: '09800eb3f4c5709e2d58ea02884ca92f',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
};
