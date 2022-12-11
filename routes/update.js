const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"public/uploads")
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const update = multer({storage: storage});

const VideoModel = require("../models/videoModel");

router.patch("/:id",update.single("video-file1"),async (req,res) => {

    try {
        if (req.file) {
            // find the video file
            let findVideo = await VideoModel.findById(req.params.id);

            // here delete file
            fs.unlinkSync("public/uploads/" + findVideo.video_source);

            // finally update the video
            const updateVideo = await VideoModel.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                video_source: req.file.filename,
                video_mimetype: req.file.mimetype
            });

            res.json({
                success: true,
                output: updateVideo
            })
        } else {
            const updateVideo = await VideoModel.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                date: req.body.date,
                description: req.body.description
            });

            res.json({
                success: true,
                output: updateVideo
            })
        }

    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

module.exports = router;