const express = require("express");
const {
  userProfile,
  updateUserProfile,
  allretiredusers,
} = require("../../controllers/user_controller/userController");
const authenticatation = require("../../middlewares/authentication");
const verifyRole = require("../../middlewares/verifyRole");

const userRouter = express.Router();

userRouter.get("/profile", authenticatation, verifyRole(["user"]), userProfile);

userRouter.put(
  "/updateprofile",
  authenticatation,
  verifyRole(["user"]),
  updateUserProfile
);

userRouter.get(
  "/allrusers",
  authenticatation,
  verifyRole(["user"]),
  allretiredusers
);

module.exports = userRouter;
