const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

const local = new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User.findOne({ email }).then((user) => {
        if (!user || user.isPasswordCorrect(password)) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);

    }).catch(
        (err) => {

            console.log("error in finding user --> Passport");
            return done(err);
        })


});

passport.use('local', local);

// SERIALIZE USER
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// DESERIALIZE USER
passport.deserializeUser(function (id, done) {
    User.findById(id)
    .then((user) => {
        return done(null, user);
    })
    .catch((err)=> {
            console.log("Error in finding user --> Passport");
            return done(err);
    });
        
});

// CHECK IF USER IS AUTHENTICATED

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
};

// SET AUTHENTICATED USER FOR VIEWS

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;

    }
    next();
};