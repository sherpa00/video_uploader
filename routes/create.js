const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"public/uploads")
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage: storage});

const VideoModel = require("../models/videoModel");

router.post("/",upload.single("video-file"),async (req,res) => {
    try {

        let newVideoModel = new VideoModel({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            video_source: req.file.filename,
            video_mimetype: req.file.mimetype
        });

        let savedNewVideo = await newVideoModel.save();
        
        res.json({
            success: true,
            output: savedNewVideo
        });
        
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    } 
});

module.exports = router;