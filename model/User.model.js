import mongoose from "mongoose";

const UserResgisterSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin", "partner"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserResgisterSchema);

export default User;
