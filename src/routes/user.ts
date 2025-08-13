import express from "express";
import { User } from "../models/User";
import { createUser, getUser, updateUser, updateUserRole } from "../controllers/userController";
import { requireRole } from "../middleware/auth";

const router = express.Router();

// Get user profile
router.get("/:uid", getUser);

// Update user profile
router.put("/:uid", updateUser);

// Create new user (for initial sign-up)
router.post("/", createUser);

router.put("/:uid/update-role", requireRole(["superuser", "admin"]), updateUserRole);

export default router;