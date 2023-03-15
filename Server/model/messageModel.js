const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
        type: { type: String },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", MessageSchema);

exports.Message = Message;