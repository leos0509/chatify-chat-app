import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //check if user exists
    const userExist = await User.findOne({ email }).exec();

    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    //input validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are requireda" });
    }

    //password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    //generate token
    generateToken(newUser._id, res);
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: `Failed to create user: ${error}` });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateToken(user._id, res);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Failed to sign in: ${error}` });
  }
};

export const signout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ message: "Sign out successful" });
  } catch (error) {
    res.status(500).json({ error: `Failed to sign out: ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: `Failed to update profile: ${error}` });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: `Failed to authenticate user: ${error}` });
  }
};
