const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const VideoModel = require("../models/videoModel");

// Delete all vidoes
router.delete("/deleteall",async (req,res) => {
    try {
        let findVideo = await VideoModel.find({});

        if (findVideo) {
            
            // loop all videos and also deleting videos
            findVideo.forEach(async (video) => {
                fs.unlinkSync("public/uploads/" + video.video_source);

                let deleteAllVideos = await VideoModel.findByIdAndDelete(video._id);
            });

            res.json({
                success: true,
                output: {
                    message: "Your all videos are deleted"
                }
            })
        }
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

// Delete video
router.delete("/:id",async (req,res) => {
    try {

        let findVideo = await VideoModel.findById(req.params.id);

        // delete video from fs
        fs.unlinkSync("public/uploads/" + findVideo.video_source);

        let deleteVideo = await VideoModel.findByIdAndDelete(req.params.id);
        
        res.json({
            success: true,
            output: deleteVideo
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});


module.exports = router;