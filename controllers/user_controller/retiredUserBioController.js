const express = require('express');
const RetiredUserBio = require('../../models/retiredUserBio');


module.exports.createBio = async(req,res) =>{
try{
    let {bio, experienceYear, expertise, achievements, languages } = req.body;

    let url = req.file.path;
    let filename = req.file.filename;

    if(!req.file){
        return res.status(404).josn({success:false , message: "Image file not found", error: error.message});
    }

    const newBio = new RetiredUserBio({
        _id: req.user._id,
        bio: bio,
        experienceYear: experienceYear,
        expertise: expertise ? expertise.split(",").map((e) => e.trim()) : [],
        achievements: achievements ? achievements.split(",").map((a) => a.trim()) : [],
        languages: languages ? languages.split(",").map((l) => l.trim()) : [],
    });

    newBio.bioPic = {url,filename};
    await newBio.save();
}
catch(error){
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
}
}

