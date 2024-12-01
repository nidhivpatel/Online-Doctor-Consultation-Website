import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
} from "reactstrap";
import axios from "axios";
import "./Appointment1.css";

const AppointmentModal = (props) => {
  const { doctorName, doctorId, modal, toggle } = props;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [illness, setIllness] = useState("");
  const [slots, setSlots] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState([]);
  const [selection, setSelection] = useState(0);
  const [canBook, setCanBook] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const ddMmYyyy = (today) => {
    return today.toLocaleDateString(["ban", "id"], { dateStyle: "short" });
  };

  const getCurrentTime = () => {
    let current = new Date();
    let current_time = current.toLocaleTimeString("it-IT", {
      hour: "numeric",
    });
    return current_time;
  };

  const displayDate = (time) => {
    let display_time = (time % 12) + ":00 PM";
    return display_time;
  };

  useEffect(async () => {
    let dt = ["", ""];
    let current = new Date();
    dt[0] = ddMmYyyy(current);

    try {
      await axios
        .post(
          "http://localhost:5000/chat/udget",
          {
            userId: user.id,
            doctorId: doctorId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "ok") {
            if (dt[0] <= response.data.chat.date) {
              alert(
                "You have already booked an appointment with " + doctorName
              );
              toggle();
            }
          }
        });
    } catch (err) {
      alert("Some error occured!");
    }

    let next = new Date();
    next.setDate(current.getDate() + 1);
    dt[1] = ddMmYyyy(next);
    setDate(dt);

    let promises = [];
    let slots = [
      [
        { startTime: 13, isAvl: false },
        { startTime: 14, isAvl: false },
        { startTime: 15, isAvl: false },
        { startTime: 16, isAvl: false },
      ],
      [
        { startTime: 13, isAvl: false },
        { startTime: 14, isAvl: false },
        { startTime: 15, isAvl: false },
        { startTime: 16, isAvl: false },
      ],
    ];

    for (let d = 0; d < 2; d++) {
      for (let s = 0; s < 4; s++) {
        if (
          1 === d ||
          // new Date().getDay() === 0 ||
          getCurrentTime() < slots[d][s].startTime
        ) {
          promises.push(
            axios
              .post(
                "http://localhost:5000/chat/is_available",
                {
                  id: doctorId,
                  date: date[d],
                  slot: s,
                },
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then((res) => {
                console.log(res.data);
                if (res.data === null) {
                  slots[d][s].isAvl = true;
                }
              })
          );
        }
      }
    }
    Promise.all(promises)
      .then(() => {
        setSlots(slots);
        setIsLoaded(true);
      })
      .catch(console.log);
  }, [doctorId]);

  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    console.log("Appointment");
    try {
      axios
        .all([
          axios.post(
            "http://localhost:5000/appointment/add",
            {
              userId: user.id,
              doctorId: doctorId,
              doctorName: doctorName,
              patientName: user.name,
              age: age,
              gender: gender,
              date: date[selection.day],
              slot: selection.slot,
              description: illness,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
          axios.post(
            "http://localhost:5000/chat/create",
            {
              userId: user.id,
              userName: user.name,
              doctorId: doctorId,
              doctorName: doctorName,
              date: date[selection.day],
              slot: selection.slot,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            if (res1.data.status === "ok" && res2.data.status === "ok") {
              alert("Appointment registered and chat created");
            } else if (res1.data.status === "ok") {
              alert("Appointment registered");
            } else if (res2.data.status === "ok") {
              alert("Chat created");
            } else {
              alert("Nothing done!!");
            }
          })
        );

      toggle();
      setAge(0);
      setGender("Select Gender");
      setIllness("");
    } catch (error) {
      console.log(error);
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error occured!!";
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Appointment for {doctorName}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitAppointmentForm}>
            <div
              className="alert alert-danger d-none"
              id="alert"
              role="alert"
            ></div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Doctor Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Doctor Name"
                value={doctorName}
                disabled
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Patient name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter patient name"
                value={user.name}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                max="100"
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Gender</label>
              <select
                className="custom-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option disabled defaultValue>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Describe your illness
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
                placeholder="Describe your illness with symptoms"
                required
              ></textarea>
            </div>
            {isLoaded === false ? (
              <div className="loading">Loading Available slots...</div>
            ) : (
              <div className="slots-info">
                <div className="colour-sign">
                  <div className="available slot sign"></div>
                  <p>available slots</p>
                  <div className="unavailable slot sign"></div>
                  <p>unavailable slots</p>
                </div>
                <div className="day-info">
                  <div className="date-day">
                    {date[0]} {/* day[0]} */}
                  </div>
                  <div className="slots">
                    {slots[0].map((s, index) => {
                      if (s.isAvl) {
                        return (
                          <label>
                            <input
                              type="radio"
                              name="product"
                              class="card-input-element"
                            />
                            <div class="card-input">
                              <div class="panel-body">
                                <Card
                                  className="available slot"
                                  key={index}
                                  onClick={() =>
                                    setSelection({ day: 0, slot: index })
                                  }
                                >
                                  {displayDate(s.startTime)}
                                </Card>
                              </div>
                            </div>
                          </label>
                        );
                      }
                      return (
                        <div className="unavailable slot" key={index}>
                          {displayDate(s.startTime)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="day-info">
                  <div className="date-day">
                    {date[1]} {/* day[1]} */}
                  </div>
                  <div className="slots">
                    {slots[1].map((s, index) => {
                      if (s.isAvl) {
                        return (
                          <label>
                            <input
                              type="radio"
                              name="product"
                              class="card-input-element"
                            />
                            <div class="card-input">
                              <div class="panel-body">
                                <Card
                                  className="available slot"
                                  key={index}
                                  onClick={() =>
                                    setSelection({ day: 1, slot: index })
                                  }
                                >
                                  {displayDate(s.startTime)}
                                </Card>
                              </div>
                            </div>
                          </label>
                        );
                      }
                      return (
                        <div className="unavailable slot" key={index}>
                          {displayDate(s.startTime)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-success">
              Make Appointment
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppointmentModal;
