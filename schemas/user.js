const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, required: true, min: 18 },
  passion: { type: String, required: true }
});

module.exports = userSchema;
