const catchAsync = require("../utils/catchAsync.js");

const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user.js");

router.get("/login", (req, res) => {
    res.render("users/login.ejs", { pageCSS: "auth.css" });
})
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), (req, res) => {
    req.flash("success", "Welcome Back !");
    const redirectURL = req.session.redirectURL || "/";
    delete req.session.redirectURL;
    res.redirect(redirectURL);
})

router.get("/register", (req, res) => {
    res.render("users/register.ejs");
})
router.post("/register", catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, err => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Welcome to SkillNest !");
        res.redirect("/");
    })
}))

router.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash("success", "GoodBye !");
        res.redirect("/");
    })
})

module.exports = router; 