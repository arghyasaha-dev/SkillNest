const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },

        description: {
            type: String,
            required: true
        },

        budget: {
            type: Number,
            required: true,
            min: 0
        },

        deadline: {
            type: Date,
            required: false
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["open", "in_progress", "completed", "cancelled"],
            default: "open"
        },

        acceptedBid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid",
            default: null
        },

        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", TaskSchema);
