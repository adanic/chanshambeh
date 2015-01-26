// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null, { username: 'user', password: 'user'})
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({

        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // if no user is found, return the message
        if (username != 'user')
            return done(null, false, req.flash('loginMessage', 'نام کاربری معتبر نمی باشد.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (password != 'user')
            return done(null, false, req.flash('loginMessage', 'رمز عبور اشتباه است.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, username);

    }));

};

