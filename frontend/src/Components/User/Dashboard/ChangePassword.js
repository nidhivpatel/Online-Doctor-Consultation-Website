import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Profile.css";
import Navbar from "../Dashboard/Navbar";
import axios from "axios";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [opassword, setOpassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      if (opassword || password || cpassword) {
        if (opassword && password && cpassword) {
          if (password === cpassword) {
            axios
              .post(
                "http://localhost:5000/user/change",
                { id: id, opassword: opassword, password: cpassword },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                // console.log(response.data);
                if (response.data.status === "ok") {
                  alert("Password Changed!!");
                } else {
                  alert("Error occured ", response.data.error);
                }
              });
          } else {
            alert("password and confirm password does not match");
          }
        } else {
          alert("All password fields are required");
        }
      } else {
        alert("No change in Password");
      }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

  return (
    <div>
      <Navbar />
      <Row>
        <Col className="account1">
          <div>
            <form className="account-form" onSubmit={() => handleSubmit()}>
              <div>
                <h3>Change Password</h3>
              </div>
              <div>
                Old Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={opassword}
                  onChange={(e) => setOpassword(e.target.value)}
                />
              </div>
              <div>
                New Password
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                Confirm New Password
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <div className=" d-flex justify-content-center">
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
              <div className=" d-flex justify-content-center">
                <a href="/profile">Cancel</a>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
