const bcrypt = require("bcryptjs");
const User = require("./models/Users.ts")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { Request, Response } from "express"

type MyUser = {
  name: string;
  email: string;
  password: string;
}

passport.serializeUser((user: any, done: any)=> {
    done(null, user.id);
});

passport.deserializeUser((id: any, done: any)=> {
    User.findById(id, (err: Error, user: any)=> {
        done(err, user);
    });
});



passport.use(
    new LocalStrategy({usernameField: "email"}, (email: String, password: String, done: any) => {
        //match user
        User.findOne({ email: email })
        .then((user: MyUser) => {
            if (!user) {
                const newUser = new User({ email, password});
                bcrypt.genSalt(10, (err: Error, salt: String) => {
                    bcrypt.hash(newUser.password, salt, (err: Error, hash: String)=> {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user: MyUser) => {
                                return done(null, user);
                            })
                            .catch((err: Error) => {
                                return done(null, false, {message:err});
                            })
                    })
                })
            } else {
                bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Wrong password"});
                    }
                })
            }
        })
        .catch((err: Error) => {
            return done(null, false, {message :err})
        })
    })
)

module.exports = passport;