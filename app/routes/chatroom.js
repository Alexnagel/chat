'use strict';

module.exports = function(app) {
	var chat = require('../controllers/chatroom');

	app.get('/chatroom/:chatroomId', chat.getChatroom);
	app.del('/chatroom/:chatroomId', chat.destroy);

	app.get('/chatrooms', chat.getChatrooms);
	app.post('/chatroom', chat.create);

	app.param('chatroomId', chat.chatroom);
}