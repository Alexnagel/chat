'use strict';

var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
	var chat = require('../controllers/chatroom');

	app.get('/chatroom/:chatroomId', chat.getChatroom);
	app.post('/chatroom', chat.create);

	app.param('chatroomId', chat.chatroom);
}