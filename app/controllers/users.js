'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User     = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logOut();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;
    user.description = "Fill in your bio!";
    user.image = "http://static.freepik.com/free-photo/super-simple-avatar_318-1018.jpg";

    user.provider = 'local';

    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Gebruikersnaam bestaat al';
                    break;
                default:
                    message = 'Vul aub alle velden in';
            }

            return res.send('false');
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.jsonp(req.user || null);
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

exports.saveMe = function(req, res) {
    var user = new User(req.body);

    User.findOne({
        _id: req.body._id
    }).exec(function(err, oldUser){
        if(!err) {
            console.log(user, 'user');
            console.log(oldUser, 'oldUser');
            
            oldUser.name        = user.name;
            oldUser.username    = user.username;
            oldUser.email       = user.email;
            oldUser.image       = user.image;
            oldUser.description = user.description;

            oldUser.save();   
        }
    });
}

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};