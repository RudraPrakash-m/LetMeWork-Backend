const RETIREDUSER_MODEL = require("../models/retiredUserModel");
const USER_MODEL = require("../models/userModel");

const allusers = async (req, res) => {
  try {
    const users = await USER_MODEL.find();
    const retiredUsers = await RETIREDUSER_MODEL.find({ isVerified: true });

    if (
      (!users || users.length === 0) &&
      (!retiredUsers || retiredUsers.length === 0)
    ) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: [...users, ...retiredUsers],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
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

const updateVerified = async (req, res) => {
  const { id } = req.params;

  try {
    // Perform the update and wait for it to complete
    const result = await RETIREDUSER_MODEL.updateOne(
      { _id: id },
      { $set: { isVerified: true } }
    );

    // Check if any document was actually updated
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Retired user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User verification status updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating verification",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await USER_MODEL.findById(id);

    if (user) {
      await USER_MODEL.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "User deleted successfully (from USER_MODEL)",
      });
    }

    const retiredUser = await RETIREDUSER_MODEL.findOne({
      _id: id,
      isVerified: true,
    });

    if (retiredUser) {
      await RETIREDUSER_MODEL.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Retired user deleted successfully (from RETIREDUSER_MODEL)",
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found in either collection",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};

module.exports = { allusers, updateVerified, profile, deleteUser };
