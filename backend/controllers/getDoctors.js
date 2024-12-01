import Doctor from "../models/doctor.js";

export const getDoctors = async (req, res) => {
  Doctor.find()
    .then((doctors) => {
      // console.log(doctors);
      res.json(doctors);
    })
    .catch((err) => res.json({ error: "Error fetching doctors list" }));
};
