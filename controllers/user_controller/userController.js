const RETIREDUSER_MODEL = require("../../models/retiredUserModel");
const USER_MODEL = require("../../models/userModel");

const userProfile = async (req, res) => {
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

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, email, password, passion } = req.body;

    const user = await USER_MODEL.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (passion) user.passion = passion;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        passion: user.passion,
        domain: user.domain,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const allretiredusers = async (req, res) => {
  try {
    const allrUsers = await RETIREDUSER_MODEL.find();

    if (!allrUsers || allrUsers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No retired users found" });
    }

    res.status(200).json({
      success: true,
      message: "All retired users fetched successfully",
      users: allrUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { userProfile, updateUserProfile, allretiredusers };
