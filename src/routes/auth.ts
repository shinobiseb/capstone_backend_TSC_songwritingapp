const express = require("express");
const router = express.Router();
const passport = require("passport");
import { Request, Response } from "express"

router.post("/register_login", (req: Request, res: Response, next: any) => {
    passport.authenticate("local", function(err: Error, user: any, info: any) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err: any) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `Welcome ${user.id}!` });
        });
    })(req, res, next);
});

module.exports = router;