import React, { useState, useEffect } from "react";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default function DoctorDashboard() {
  const [Appointments, SetAppointments] = useState("");
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const slots = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/appointment/d_get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorid: doctor.id,
        }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data);
          SetAppointments(data);
        })
      );
    };
    fecthData();
  }, []);

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/doctor/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/doctor/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/doctor/login"
              // onClick={(e) => {
              //   localStorage.removeItem("doctor");
              // }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/doctor/Profile">
              <Nav.Link href="/doctor/Profile">
                <FaUserCircle />
                {" Hello " + doctor.name}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <br />
      <div>
        <center>
          <h5></h5>
          <h4 className="pb-3">Your Appointments</h4>
        </center>
        <div className="appointment-card">
          <div className="appointments">
            {Object.keys(Appointments)
              .filter((key) => key)
              .map((key, index) => {
                return (
                  <div>
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          Patient Name : {Appointments[key].patientName}
                        </Card.Title>
                        <Card.Text>
                          Illness : {Appointments[key].description}
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
    </div>
  );
}
