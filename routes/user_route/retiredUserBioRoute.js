const express = require('express');
const authentication = require("../../middlewares/authentication");
const verifyRole = require("../../middlewares/verifyRole");
const router = express.Router();

const retiredUserBioController = require('../../controllers/user_controller/retiredUserBioController');

const multer  = require('multer');
const {storage} = require("../../congig/cloudinary/cloudConfig"); 
const upload = multer({ storage });



router.route("/create")
.post(authentication, verifyRole(["user"]), upload.single("bioPic"),  retiredUserBioController.createBio);

router.route("/get/:retiredUserId")
.get(authentication,verifyRole(["user"]), retiredUserBioController.getBio);

router.route("/update/:retiredUserId")
  .put(authentication, verifyRole(["user"]), upload.single("bioPic"), retiredUserBioController.updateBio);

router.route("/delete/:retiredUserId")
  .delete(authentication, verifyRole(["user"]), retiredUserBioController.deleteBio);


module.exports = router;