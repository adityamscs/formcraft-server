import { Request, Response } from "express";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ uid: req.params.uid });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, phone, department, className } = req.body;
  const user = await User.findOneAndUpdate(
    { uid: req.params.uid },
    { name, phone, department, className },
    { new: true, upsert: true }
  );
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { uid, email, role } = req.body;
  const user = new User({ uid, email, role: role || "user" });
  await user.save();
  res.status(201).json(user);
};

// Only superuser/admin can update roles
export const updateUserRole = async (req: Request, res: Response) => {
  // Require superuser/admin middleware
  const { uid, role } = req.body;
  const user = await User.findOneAndUpdate({ uid }, { role }, { new: true });
  res.json(user);
};
