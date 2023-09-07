const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    message: {
        type: String,
        required: true
    },


}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);


