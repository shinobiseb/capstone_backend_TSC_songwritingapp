"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var passport = require("passport");
router.post("/register_login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: "Welcome ".concat(user.id, "!") });
        });
    })(req, res, next);
});
module.exports = router;
//# sourceMappingURL=auth.js.map