import express from "express";
import {
  AddAppointment,
  GetAppointments,
  GetDoctorAppointments,
} from "../controllers/appointment.js";

const router = express.Router();

router.post("/add", AddAppointment);
router.post("/get", GetAppointments);
router.post("/d_get", GetDoctorAppointments);

export default router;
