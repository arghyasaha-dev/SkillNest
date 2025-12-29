const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("users/login.ejs", { pageCSS: "auth.css" });
})

router.get("/register", (req, res) => {
    res.render("users/register.ejs", { pageCSS: "auth.css" });
})

module.exports = router; 