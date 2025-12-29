const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
            index: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: ["text", "system"],
            default: "text"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Message", MessageSchema);
