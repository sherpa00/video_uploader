const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/video-gallery",(err) => {
    if (!err) {
        console.log("Database is connected..");
    }
});