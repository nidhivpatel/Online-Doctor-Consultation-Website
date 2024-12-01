import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./search.css";
import doc from "../../../Assets/doc.png";
import "./Doclist.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import AppointmentModal from "./AppointmentModal";

const Search = () => {
  const [SearchDoctor, SetSearchDoctor] = useState("");
  const [DoctorList, SetDoctorList] = useState("");
  const [Modal, SetModal] = useState(false);
  const [Doctor, SetDoctor] = useState("");
  const [DoctorId, SetDoctorId] = useState("");

  const toggle = () => {
    SetModal(!Modal);
  };

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/user/doctors", { method: "POST" }).then(
        (response) =>
          response.json().then((data) => {
            console.log(data);
            const list = [];
            data.forEach(function (doctor) {
              list.push({
                id: doctor._id,
                full_name: doctor.name,
                job_title: doctor.speciality,
                description: doctor.description,
              });
            });
            console.log(list);
            SetDoctorList(list);
          })
      );
    };
    fecthData();
  }, []);

  return (
    <div>
      <div className="search-container">
        <div className="search-box">
          <h1>
            Find a doctor who
            <br /> can take care of you
          </h1>
          <br />
          <h6>Search your doctor now</h6>

          <input
            type="text"
            placeholder="search anything"
            onChange={(event) => {
              SetSearchDoctor(event.target.value);
            }}
          ></input>
        </div>
        <div className="pr-0">
          <img src={doc} alt="Doctor" width="550" height="550px" />
        </div>
      </div>
      <div className="list-container">
        <div className="list-wrap">
          <Row>
            {Object.keys(DoctorList)
              .filter((key) => {
                if (SearchDoctor === "") {
                  return 1;
                } else if (
                  DoctorList[key].job_title
                    .toLocaleLowerCase()
                    .includes(SearchDoctor.toLocaleLowerCase())
                ) {
                  return DoctorList[key];
                }
              })
              .map((key, index) => {
                return (
                  <Col xs={4} className="pb-4" key={key}>
                    <Card
                      style={{
                        width: "17rem",
                        boxShadow: "5px 5px 5px 5px solid red",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{DoctorList[key].full_name}</Card.Title>
                        <Card.Subtitle className="mb-1">
                          {DoctorList[key].job_title}
                        </Card.Subtitle>
                        <hr style={{ color: "#fdba69", height: "2px" }} />
                        <Card.Text
                          style={{
                            color: "#005f95",
                            fontWeight: "bold",
                            opacity: "0.9",
                          }}
                        >
                          {DoctorList[key].description}
                        </Card.Text>
                        <center>
                          <Button
                            style={{ backgroundColor: "#064420" }}
                            onClick={(e) => {
                              SetDoctor(e.target.getAttribute("doctor-name"));
                              SetDoctorId(e.target.getAttribute("doctor-id"));
                              toggle();
                            }}
                            doctor-name={DoctorList[key].full_name}
                            doctor-id={DoctorList[key].id}
                          >
                            Book Appointment
                          </Button>
                        </center>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <AppointmentModal
        doctorName={Doctor}
        doctorId={DoctorId}
        modal={Modal}
        toggle={toggle}
      />
    </div>
  );
};

export default Search;
