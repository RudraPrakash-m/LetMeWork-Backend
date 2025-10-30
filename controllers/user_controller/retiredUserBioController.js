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

    if(!newBio){
        return res.status(404).json({
        success: false,
        message: "Bio not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Bio updated successfully",
        data: newBio,
    });
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

    return res.status(200).json({
        success: true,
        data: bioData,
    })

    }
    catch(error){
        res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    }
}


//update bio

module.exports.updateBio = async(req,res)=>{
    try{
        const { retiredUserId } = req.params;
        let {bio, experienceYear, expertise, achievements, languages } = req.body;

        const updateData = {
            bio,
            experienceYear,
            expertise: expertise ? expertise.split(",").map(e => e.trim()) : undefined,
            achievements: achievements ? achievements.split(",").map(a => a.trim()) : undefined,
            languages: languages ? languages.split(",").map(l => l.trim()) : undefined,
        };

        if(req.file){
            updateData.bioPic = {
                url: req.file.path,
                filename: req.file.filename,
            }
        }


        const updateBio = await RetiredUserBio.findByIdAndUpdate(retiredUserId,  { $set: updateData }, { new: true , runValidators: true });

        if(!updateBio){
            return res.status(404).json({
            success: false,
            message: "Bio not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bio updated successfully",
            data: updateBio,
        });

    }
    catch(error){
        res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    }
}


module.exports.deleteBio = async(req,res) =>{
    try{
        const { retiredUserId } = req.params;

        if (!retiredUserId) {
            return res.status(400).json({
            success: false,
            message: "retired user id is not found",
            });
        }

        const deleteBio = await RetiredUserBio.findByIdAndDelete(retiredUserId);

        if (!deleteBio) {
            return res.status(404).json({
            success: false,
            message: "Bio not found or already deleted",
            });
        }

    
        return res.status(200).json({
            success: true,
            message: "Bio deleted successfully",
            });
    }
    catch(error){
        res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
}
