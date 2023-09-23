const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");

const updateUserProfile = async (req, res) => {
  try {
    const formData = req.body;

    // console.log(formData);
    const query = { _id: formData._id };

    const updatedDocument = {
      $set: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        agencyName: formData.agencyName,
        gender: formData.gender,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        height: formData.height,
        about: formData.about,
        complexion: formData.complexion,
        telephone: formData.telephone,
        stature: formData.stature,
        location: formData.location,
      },
    };

    // Handle file uploads
    const fileFields = [
      "displayPicUrl",
      "businessCerUrl",
      "imageUrl1",
      "imageUrl2",
      "imageUrl3",
    ];

    fileFields.forEach((fieldName) => {
      if (req.files[fieldName]) {
        const fileUrl = req.files[fieldName][0].path;
        updatedDocument.$set[fieldName] = fileUrl;
      }
    });
    console.log(updatedDocument);
    const insertedUser = await UserModel.findOneAndUpdate(
      query,
      updatedDocument,
      { new: true }
    );

    console.log(insertedUser);
    res.status(201).json({
      message: "User profile updated successfully",
      data: insertedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user profile" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, _id } = req.body;
    // const query = { user_id: user_id };

    // console.log(query);

    if (!oldPassword || !newPassword || !_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // const userIdObject = mongoose.Types.ObjectId(user_id);

    const user = await UserModel.findOne({ _id: _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = { updateUserProfile, changePassword };
