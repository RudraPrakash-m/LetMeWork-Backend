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



module.exports = router;