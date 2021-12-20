"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var User = require("../models/Users");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
    User.findOne({ email: email })
        .then(function (user) {
        if (!user) {
            var newUser_1 = new User({ email: email, password: password });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser_1.password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    newUser_1.password = hash;
                    newUser_1
                        .save()
                        .then(function (user) {
                        return done(null, user);
                    })
                        .catch(function (err) {
                        return done(null, false, { message: err });
                    });
                });
            });
        }
        else {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    throw err;
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: "Wrong password" });
                }
            });
        }
    })
        .catch(function (err) {
        return done(null, false, { message: err });
    });
}));
module.exports = passport;
//# sourceMappingURL=setup.js.map