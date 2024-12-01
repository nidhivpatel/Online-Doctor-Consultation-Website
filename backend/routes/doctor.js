import express from "express";
import {
  createDoctor,
  loginDoctor,
  editDoctor,
  changePassword,
} from "../controllers/doctor.js";

const router = express.Router();

router.post("/register", createDoctor);
router.post("/login", loginDoctor);
router.post("/edit", editDoctor);
router.post("/change", changePassword);

export default router;
