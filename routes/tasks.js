const catchAsync = require("../utils/catchAsync.js");

const express = require("express");
const router = express.Router({ mergeParams: true });
const Task = require("../models/task.js");
const Bid = require("../models/bid.js");
const Review = require("../models/review.js");

// tasks
router.get("/", catchAsync(async (req, res) => {
    const tasks = await Task.find({});
    res.render("tasks/index.ejs", { pageCSS: "tasks.css", tasks });
}))
router.get("/new", (req, res) => {
    res.render("tasks/new.ejs", { pageCSS: "tasks.css" })
})
router.post("/", catchAsync(async (req, res) => {
    const { title, description, budget } = req.body;
    const newTask = new Task({
        title: title,
        description: description,
        budget: budget
    });
    await newTask.save();
    req.flash("success", "Successfully added Task !");
    res.redirect("/tasks");
}))
router.get("/:id", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const task = await Task.findById(taskid).populate("owner").populate("acceptedBid");
    const bids = await Bid.find({ task: taskid }).populate("bidder");
    res.render("tasks/show.ejs", { pageCSS: "tasks.css", task, bids });
}))

// bids
router.get("/:id/bids/new", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const task = await Task.findById(taskid);

    res.render("bids/new.ejs", { pageCSS: "bids.css", task });
}))
router.post("/:id/bids", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const { amount, message } = req.body;
    const newBid = new Bid({ amount, message, task: taskid });
    await newBid.save();
    req.flash("success", "Successfully added your Bid !");
    res.redirect("/tasks/" + taskid);
}))
router.get("/:id/bids/:bidid", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const bidid = req.params.bidid;
    const bid = await Bid.findById(bidid).populate("bidder").populate("task");
    res.render("bids/show.ejs", { pageCSS: "bids.css", bid, taskid });
}))
router.get("/:id/bids/:bidid/edit", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const bidid = req.params.bidid;
    const bid = await Bid.findById(bidid).populate("bidder");
    res.render("bids/edit.ejs", { pageCSS: "bids.css", bid, taskid });
}))
router.put("/:id/bids/:bidid", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const bidid = req.params.bidid;
    const { message, amount } = req.body;
    const bid = await Bid.findByIdAndUpdate(bidid, { message, amount }).populate("bidder");
    req.flash("success", "Successfully Update your Bid");
    res.redirect("/tasks/" + taskid);
}))
router.post("/:id/bids/:bidid/accept", catchAsync(async (req, res) => {
    const { bidid } = req.params;
    const taskid = req.params.id;

    // accept selected bid
    await Bid.findByIdAndUpdate(bidid, { status: "accepted" });
    // reject other bids of same task
    await Bid.updateMany(
        { task: taskid, _id: { $ne: bidid } },
        { status: "rejected" }
    );

    req.flash("success", "Congrats! your bid is accepted ");
    res.redirect(`/tasks/${taskid}/bids/${bidid}`);
}))
router.delete("/:id/bids/:bidid", catchAsync(async (req, res) => {
    const { bidid } = req.params;
    const taskid = req.params.id;
    await Bid.findByIdAndDelete(bidid);
    // also removing from Task Schema 
    await Task.findByIdAndUpdate(taskid, {
        $pull: { bids: bidid }
    });

    req.flash("success", "Successfully deleted bid !");
    res.redirect(`/tasks/${taskid}`);
}))


// reviews
router.get("/:id/reviews", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const task = await Task.findById(taskid)//.populate("reviews");
    const reviews = await Review.find({}).populate("task");
    res.render("reviews/show.ejs", { pageCSS: "reviews.css", task, reviews });
}))
router.get("/:id/reviews/:reviewid/edit", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const { reviewid } = req.params;
    const task = await Task.findById(taskid);
    const review = await Review.findById(reviewid).populate("task");
    res.render("reviews/edit.ejs", { pageCSS: "reviews.css", task, review });
}))
router.get("/:id/reviews/new", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const task = await Task.findById(taskid);
    res.render("reviews/new.ejs", { pageCSS: "reviews.css", task });
}))
router.post("/:id/reviews", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const { comment, reviewer, rating } = req.body;
    const newReview = new Review({ comment, reviewer, rating, task: taskid });
    await newReview.save();
    req.flash("success", "Successfully created a review");
    res.redirect(`/tasks/${taskid}/reviews`);
}))
router.put("/:id/reviews/:reviewid", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const { reviewid } = req.params;
    const { comment, reviewer, rating } = req.body;
    await Review.findByIdAndUpdate(reviewid, { comment, reviewer, rating });
    req.flash("success", "Successfully updated a review");
    res.redirect(`/tasks/${taskid}/reviews`);
}))
router.delete("/:id/reviews/:reviewid", catchAsync(async (req, res) => {
    const taskid = req.params.id;
    const { reviewid } = req.params;
    await Review.findByIdAndDelete(reviewid);
    // deleting from Task 
    await Task.findByIdAndUpdate(taskid, { $pull: { review: reviewid } });
    req.flash("success", "Successfully deleted review");
    res.redirect(`/tasks/${taskid}/reviews`);
}))

// chats
router.get("/:id/chat", (req, res) => {
    res.render("chat/rooms.ejs", { pageCSS: "chat.css" });
})

module.exports = router; 