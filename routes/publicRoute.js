const express = require("express");
const {
  homePage,
  user_register,
  retireduser_register,
  login,
} = require("../controllers/publicController");

const public_router = express.Router();

public_router.get("/", homePage);

public_router.post("/userregister", user_register);
public_router.post("/retireduserregister", retireduser_register);

public_router.post("/login", login);

module.exports = public_router;
