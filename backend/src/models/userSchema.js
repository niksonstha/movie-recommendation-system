import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
    },
    username: {
      type: String,
      unique: false,
      lowercase: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: false,
      lowercase: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  try {
    // Check if the password is modified
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain password with the hashed password
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

export const User = mongoose.model("User", userSchema);
