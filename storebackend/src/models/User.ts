import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "employee"], required: true },
  preference: { type: String, enum: ["user", "employee"], default: "user" },
});

const User = mongoose.models.User || mongoose.model("Users", userSchema);
export default User;
