const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/User.js");

const tokenExpiration = 3600;

const registerUser = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const generatedUserId = uuidv4();
    const newUser = new UserModel({
      // user_id: generatedUserId,
      email,
      password: hashedPassword,
      type,
    });

    await newUser.save();
    const expirationTime = Math.floor(Date.now() / 1000) + tokenExpiration;

    const token = jwt.sign(
      { ...newUser.toJSON(), exp: expirationTime },
      process.env.JWT_SECRETKEY
    );
    res.status(200).json({
      token,
      userId: newUser._id,
      email,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log();
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }
    const expirationTime = Math.floor(Date.now() / 1000) + tokenExpiration;

    const token = jwt.sign(
      { ...user.toJSON(), exp: expirationTime },
      process.env.JWT_SECRETKEY
    );
    res.status(200).json({ token, userId: user._id, email, type: user.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.json({ error: "an error occured while fetching users" });
  }
};

const getUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    // const users = await UserModel.find();
    const query = { _id: userId };
    const user = await UserModel.findOne(query);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getUser };
