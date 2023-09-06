const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    provider: {
        type: String,
    },
    provider_id: {
        type: String,
    },
    provider_pic: {
        type: String,
    },
    tokens: {
        type: Array,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetToken: {
        type: String,
        default: ""
    },
    expireToken: {
        type: Date,
        default: ""
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

