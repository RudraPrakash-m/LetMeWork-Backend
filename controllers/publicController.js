const {
  user_registerValidation,
  retireduser_registerValidation,
} = require("../joiValidations/joiValidation");
const RETIREDUSER_MODEL = require("../models/retiredUserModel");
const USER_MODEL = require("../models/userModel");
const jwt = require("jsonwebtoken");

const homePage = async (req, res) => {
  res.json({ message: "This is home page." });
};

const user_register = async (req, res) => {
  const newUser = req.body;
  const { error } = user_registerValidation.validate(newUser);

  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const { email } = newUser;

  const exist = await USER_MODEL.findOne({ email });

  const exist1 = await RETIREDUSER_MODEL.findOne({ email });

  if (exist || exist1)
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });

  try {
    const result = await USER_MODEL.insertOne(newUser);
    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const retireduser_register = async (req, res) => {
  const newUser = req.body;

  const { error } = retireduser_registerValidation.validate(newUser);

  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const { email } = newUser;

  const exist = await RETIREDUSER_MODEL.findOne({ email });

  const exist1 = await USER_MODEL.findOne({ email });

  if (exist || exist1)
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });

  try {
    const result = await RETIREDUSER_MODEL.insertOne(newUser);
    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });

  const user =
    (await USER_MODEL.findOne({ email }).lean()) ||
    (await RETIREDUSER_MODEL.findOne({ email }).lean());

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Users doesn't exist!!! register first",
    });

  if (password !== user.password)
    return res
      .status(401)
      .json({ success: false, message: "Invalid password" });

  let role;
  if (user.role === "admin") {
    role = "admin";
  } else if (user.domain) {
    role = "retired";
  } else {
    role = "user";
  }

  const { name, age, domain, isVerified , _id } = user;

  const payload = { name, email, age, domain, isVerified, role, _id };

  const token = jwt.sign(payload, process.env.SECRET_STRING, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    secure: false,
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successfull",
    token,
  });
};

module.exports = { homePage, user_register, retireduser_register, login };
