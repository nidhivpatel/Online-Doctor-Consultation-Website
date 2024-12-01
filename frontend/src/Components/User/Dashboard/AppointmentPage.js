import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./Appointment.css";
import axios from "axios";

const AppointmentPage = () => {
  const [Appointments, SetAppointments] = useState("");
  const [doctorId, SetDoctorId] = useState("");
  const id = JSON.parse(localStorage.getItem("user")).id;
  const slots = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  useEffect(() => {
    const fecthData = () => {
      axios
        .post(
          "http://localhost:5000/appointment/get",
          {
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          SetAppointments(response.data);
        });
    };
    fecthData();
  }, []);

  return (
    <div>
      <br />
      <center>
        <h4 className="pb-3">Your Appointments</h4>
      </center>
      <div className="appointment-card">
        <div className="appointments">
          {Object.keys(Appointments)
            .filter((key) => key)
            .map((key, index) => {
              return (
                <div id={key}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        Doctor Name : {Appointments[key].doctorName}
                      </Card.Title>
                      <Card.Text>
                        Health issue : {Appointments[key].description}
                        <br />
                        Date : {Appointments[key].date}
                        <br />
                        Time : {slots[Appointments[key].slot]}
                      </Card.Text>
                      {/* <center>
                        <Button
                          style={{
                            backgroundColor: "#064420",
                            width: "120px",
                            fontSize: "18px",
                          }}
                          onClick={(e) => {
                            SetDoctorId(e.target.getAttribute("doctor-id"));
                          }}
                          doctor-id={Appointments[key].doctor}
                        >
                          Start Now
                        </Button>
                      </center> */}
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default AppointmentPage;
