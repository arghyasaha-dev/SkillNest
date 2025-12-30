const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.method === "GET" && req.originalUrl !== "/login" && req.originalUrl !== "/register") {
            req.session.redirectURL = req.originalUrl;
        }
        req.flash("error", "Login Required !");
        return res.redirect("/login");
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn; 