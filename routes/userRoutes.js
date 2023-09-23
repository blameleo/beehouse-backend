// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require("uuid");
// const multer = require("multer");
// const path = require("path");
// const app = express();

// const UserModel = require("../models/User.js");
// const router = express.Router();
// // app.use(express.static("public"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extname = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + extname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/register", async (req, res) => {
//   const { email, password, type } = req.body;

//   const user = await UserModel.findOne({ email });
//   if (user) {
//     return res
//       .status(409)
//       .json({ message: "User with this email already exists" });
//   } else {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const generatedUserId = uuidv4();
//     const newUser = new UserModel({
//       user_id: generatedUserId,
//       email,
//       password: hashedPassword,
//       type,
//     });
//     await newUser.save();

//     const token = jwt.sign(newUser.toJSON(), "secret");
//     res.status(200).json({
//       token,
//       userId: generatedUserId,
//       email: email,
//       message: "User registered successfully",
//     });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UserModel.findOne({ email });
//   console.log(user);
//   if (!user) {
//     return res.json({ message: "User doesnt exist" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.json({ message: "Username or password is incorrect" });
//   }

//   const token = jwt.sign(user.toJSON(), "secret");

//   res.json({ token, userId: user.user_id, email, type: user.type });
// });

// router.get("/users", async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     res.json(users);
//   } catch (err) {
//     res.json({ error: "an error occured while fetching users" });
//   }
// });

// router.get("/user", async (req, res) => {
//   const userId = req.query.userId;
//   try {
//     // const users = await UserModel.find();
//     const query = { user_id: userId };
//     const user = await UserModel.findOne(query);
//     res.send(user);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.put(
//   "/user",
//   upload.fields([
//     { name: "displayPicUrl", maxCount: 1 }, // One file for displayPicUrl field
//     { name: "idCardUrl", maxCount: 1 },
//     { name: "businessCerUrl", maxCount: 1 }, // One file for idCardUrl field
//     { name: "imageUrl1", maxCount: 1 },
//     { name: "imageUrl2", maxCount: 1 },
//     { name: "imageUrl3", maxCount: 1 }, // One file for imageUrl1 field
//   ]),
//   async (req, res) => {
//     try {
//       const formData = req.body;
//       console.log(formData);
//       // const users = await UserModel.find();

//       const query = { user_id: formData.user_id };

//       const updatedDocument = {
//         $set: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           agencyName: formData.agencyName,
//           gender: formData.gender,
//           dob_day: formData.dob_day,
//           dob_month: formData.dob_month,
//           dob_year: formData.dob_year,
//           height: formData.height,
//           about: formData.about,
//           complexion: formData.complexion,
//           telephone: formData.telephone,
//           stature: formData.stature,
//           // businessCerturl: "",
//           // idCardUrl: "",
//           // displayPicUrl: "",
//           // imageUrl1: formData.imageUrl1,
//           // imageUrl2: "",
//           // imageUrl3: "",
//           location: formData.location,
//         },
//       };
//       if (req.files["displayPicUrl"]) {
//         const displayPicUrl = req.files["displayPicUrl"][0].path;
//         updatedDocument.$set.displayPicUrl = displayPicUrl;
//       }

//       if (req.files["idCardUrl"]) {
//         const idCardUrl = req.files["idCardUrl"][0].path;
//         updatedDocument.$set.idCardUrl = idCardUrl;
//       }

//       if (req.files["imageUrl1"]) {
//         const imageUrl1 = req.files["imageUrl1"][0].path;
//         updatedDocument.$set.imageUrl1 = imageUrl1;
//       }

//       if (req.files["imageUrl2"]) {
//         const imageUrl2 = req.files["imageUrl2"][0].path;
//         updatedDocument.$set.imageUrl2 = imageUrl2;
//       }

//       if (req.files["imageUrl3"]) {
//         const imageUrl3 = req.files["imageUrl3"][0].path;
//         updatedDocument.$set.imageUrl3 = imageUrl3;
//       }

//       if (req.files["businessCerUrl"]) {
//         const businessCerUrl = req.files["businessCerUrl"][0].path;
//         updatedDocument.$set.businessCerturl = businessCerUrl;
//       }

//       const insertedUser = await UserModel.updateOne(query, updatedDocument);
//       res
//         .status(201)
//         .json({ message: "user profile updated", data: insertedUser });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// module.exports.userRouter = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getusers", getAllUsers);
router.get("/getuser", getUser);

module.exports = { userRouter: router };
