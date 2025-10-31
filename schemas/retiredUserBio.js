const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const retiredUserBioSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "retireduser", // reference to retired user
  },
  bio: {
    type: String,
    required: true,
  },
   experienceYear: {
    type: Number,
    required: true,
  },
  expertise: {
    type: [String],
  },
  achievements: { 
    type: [String],
 },
  languages: {
    type: [String],
  },
  bioPic: {
    url: String,
    filename: String,
  },
});


module.exports = retiredUserBioSchema;