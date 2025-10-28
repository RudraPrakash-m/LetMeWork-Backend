const express = require("express");
const authenticatation = require("../../middlewares/authentication");
const {
  ruserProfile,
  rupdateProfile,
} = require("../../controllers/user_controller/retireduserController");
const verifyRole = require("../../middlewares/verifyRole");

const retiredUserRouter = express.Router();

retiredUserRouter.get(
  "/profile",
  authenticatation,
  verifyRole(["retired"]),
  ruserProfile
);

retiredUserRouter.put(
  "/updateprofile",
  authenticatation,
  verifyRole(["retired"]),
  rupdateProfile
);

module.exports = retiredUserRouter;
