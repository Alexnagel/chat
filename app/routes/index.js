'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    app.get('/%7B%7B%20global.user.image%20%7D%7D', index.nothing);
};
