const RETIREDUSER_MODEL = require("../../models/retiredUserModel");

const ruserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user not found" });
    }

    res.status(200).json({
      success: true,
      message: "Your Profile",
      user: req.user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const rupdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password, domain } = req.body;

    if (!name && !email && !password && !age && !passion) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const user = await RETIREDUSER_MODEL.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Retired user not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (domain) user.domain = domain;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Retired user profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        passion: user.passion,
      },
    });
  } catch (error) {
    console.error("Error updating retired user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { ruserProfile, rupdateProfile };
