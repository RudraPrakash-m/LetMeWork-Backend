const mongoose = require('mongoose');

const retiredUserBioSchema = require('../schemas/retiredUserBio');


const RetiredUserBio = mongoose.model('RetiredUserBio',retiredUserBioSchema);

module.exports = RetiredUserBio;