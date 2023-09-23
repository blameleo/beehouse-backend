const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: String },
  agencyName: { type: String },
  firstName: { type: String },
  dob_day: { type: String },
  dob_month: { type: String },
  dob_year: { type: String },
  height: { type: String },
  gender: { type: String },
  about: { type: String },
  complexion: { type: String },
  telephone: { type: String },
  dob_day: { type: String },
  stature: { type: String },
  businessCerturl: { type: String },
  displayPicUrl: { type: String },
  imageUrl1: { type: String },
  imageUrl2: { type: String },
  imageUrl3: { type: String },
  lastName: { type: String },
  location: { type: String },
  type: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", UserSchema);
// console.log(UserModel);

module.exports = UserModel;
// module.exports = UserModel;
