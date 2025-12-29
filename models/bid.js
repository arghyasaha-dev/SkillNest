const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0
        },

        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false // temporary 
        },

        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },
        message: {
            type: String,
            required: false,
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
            index: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bid", BidSchema);
