import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { setUser } from "../services/userAuth.js";

export const createUser = async (req, res) => {
  try {
    const { password, cpassword } = req.body;
    if (password !== cpassword) {
      return res
        .status(500)
        .json({ error: "Password and confirm password doesn't match" });
    }
    await User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = setUser(user.toObject());

    res
      .status(200)
      .cookie("uid", token, {
        expires: new Date(Date.now() + 2592000000),
      })
      .json({
        success: true,
        message: `Welcome ${user.fullname}`,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.query;

    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Compare the current password with the hashed password from the database
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Hash the new password before updating
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password with the hashed new password
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res
      .status(200)
      .json({ status: "ok", message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
