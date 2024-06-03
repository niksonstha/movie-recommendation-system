import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
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

    res.status(200).json({
      success: true,
      message: `Welcome ${user.email}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
