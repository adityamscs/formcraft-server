import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
  department: { type: String },
  className: { type: String },
  forms: [{ type: String }],
  role: { type: String, enum: ["superuser", "admin", "creator", "user"], default: "user" },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);