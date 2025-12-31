const catchAsync = require("../utils/catchAsync.js");
const Bid = require("../models/bid.js");

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

const isBidAccepted = catchAsync(async (req, res, next) => {
    const taskid = req.params.id;
    const { bidid } = req.params;
    const bid = await Bid.findById(bidid);
    if (!bid) {
        req.flash("error", "Bid is invalid !");
        return res.redirect(`/tasks/${taskid}`);
    }
    if (bid.status !== "accepted") {
        req.flash("error", "Bid is not accepted !");
        return res.redirect(`/tasks/${taskid}`);
    }
    next();
})

module.exports.isBidAccepted = isBidAccepted; 