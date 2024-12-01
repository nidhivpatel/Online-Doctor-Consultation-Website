import express from "express";
import { getDoctors } from "../controllers/getDoctors.js";
import {
  loginUser,
  createUser,
  editUser,
  changePassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/edit", editUser);
router.post("/change", changePassword);
router.post("/doctors", getDoctors);

export default router;
