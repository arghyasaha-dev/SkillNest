const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false // temporary
        },

        reviewee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },

        comment: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Review", ReviewSchema);
