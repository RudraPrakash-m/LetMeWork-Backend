const mongoose = require("mongoose");

const retiredUserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, min: 45 },
  domain: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = retiredUserSchema;
