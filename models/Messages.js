const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    updated_time: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);


