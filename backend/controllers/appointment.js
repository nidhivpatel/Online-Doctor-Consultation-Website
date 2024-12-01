import Appointment from "../models/appointment.js";

export const AddAppointment = async (req, res) => {
  console.log("Add Appointment");
  const newAppointment = new Appointment({
    user: req.body.userId,
    doctor: req.body.doctorId,
    doctorName: req.body.doctorName,
    patientName: req.body.patientName,
    age: req.body.age,
    gender: req.body.gender,
    date: req.body.date,
    slot: req.body.slot,
    description: req.body.description,
  });

  newAppointment
    .save()
    .then((appointment) =>
      res.json(
        JSON.parse(JSON.stringify({ status: "ok", appointment: appointment }))
      )
    )
    .catch((err) => {
      console.log("Error in Add appointment : ", err);
      res.json({ status: "error", error: "Error adding appointment" });
    });
};

export const GetAppointments = async (req, res) => {
  console.log("Get Appointments");
  Appointment.find({ user: req.body.id })
    .then((appointments) => {
      // console.log(appointments);
      res.json(appointments);
    })
    .catch((err) => {
      console.log("Error in get user appointments : ", err);
      res.json({ error: "Error fetching appointments" });
    });
};

export const GetDoctorAppointments = async (req, res) => {
  console.log("Get Doctor Appointments", req.body.doctorid);
  Appointment.find({ doctor: req.body.doctorid })
    .then((appointments) => {
      // console.log(appointments);
      res.json(appointments);
    })
    .catch((err) => {
      console.log("Error in get doctor appointments : ", err);
      res.json({ error: "Error fetching appointments" });
    });
};
