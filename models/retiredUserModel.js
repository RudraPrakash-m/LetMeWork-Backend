const { default: mongoose } = require("mongoose");
const retiredUserSchema = require("../schemas/retiredUser");

const RETIREDUSER_MODEL = mongoose.model("retireduser", retiredUserSchema);

module.exports = RETIREDUSER_MODEL;
