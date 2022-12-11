const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video_source: {
        type: String,
        required: true
    },
    video_mimetype: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("videos",VideoSchema);