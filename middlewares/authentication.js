const express = require("express");
const jwt = require("jsonwebtoken");

const authenticatation = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });

  try {
    const decode = jwt.verify(token, process.env.SECRET_STRING);

    req.user = decode;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or Expired token" });
  }
};

module.exports = authenticatation;
