const express = require("express");
const router = express.Router();

const VideoModel = require("../models/videoModel");

router.get("/",async (req,res) => {
    try {
        let readVideos = await VideoModel.find({});

        res.json({
            success: true,
            output: readVideos
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

router.get("/:id",async (req,res) => {
    try {
        let readVideo = await VideoModel.findById(req.params.id);
        
        res.json({
            success: true,
            output: readVideo
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

module.exports = router;