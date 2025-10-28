const express = require("express");
const {
  allusers,
  updateVerified,
  profile,
  deleteUser,
} = require("../controllers/adminController");
const authenticatation = require("../middlewares/authentication");
const adminMiddleware = require("../middlewares/adminMiddleware");

const adminRouter = express.Router();

adminRouter.get("/allusers", authenticatation, adminMiddleware, allusers);
adminRouter.get("/profile", authenticatation, adminMiddleware, profile);
adminRouter.put(
  "/verifyruser/:id",
  authenticatation,
  adminMiddleware,
  updateVerified
);
adminRouter.delete("/allusers/delete/:id",authenticatation,adminMiddleware,deleteUser)

module.exports = adminRouter;
