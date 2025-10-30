const express = require('express');
const RetiredUserBio = require('../../models/retiredUserBio');



//bio creation
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


//get individual retired user bio
module.exports.getBio = async(req,res) =>{
    try{
        const { retiredUserId } = req.params;
       
    if (!retiredUserId) {
      return res.status(404).json({
        success: false,
        message: "id not found",
      });
    }

    const bioData = await RetiredUserBio.findById(retiredUserId);
    
    if (!bioData) {
      return res.status(404).json({
        success: false,
        message: "Bio not found",
      });
    }

    res.status(200).json({
        success: true,
        data: bioData,
    })

    }
    catch(err){
         res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    }
}



