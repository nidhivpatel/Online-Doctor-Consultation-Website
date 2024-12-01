import React, { Component } from "react";
import "./SigninUp.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

class DoctorSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, " ", password);

    try {
      if (!(email && password)) {
        alert("Invalid input");
        return;
      }

      let response = await axios.post(
        "http://localhost:5000/doctor/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data.status === "ok") {
          localStorage.setItem(
            "doctor",
            JSON.stringify({
              id: response.data.doctor._id,
              name: response.data.doctor.name,
              email: response.data.doctor.email,
              speciality: response.data.doctor.speciality,
              description: response.data.doctor.description,
            })
          );
          alert("User Logged in successfully!!");
          window.location = "/doctor/dashboard";
        } else {
          alert("Error : ", response.data.error);
        }
      } else {
        alert("Error : ", response.status);
      }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="account1">
            <div>
              <form className="account-form" onSubmit={this.handleSubmit}>
                <div>
                  <h3>SignIn</h3>
                </div>
                <div>
                  Email
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="input"
                    name="email"
                    value={this.email}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Password
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input"
                    name="password"
                    value={this.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className=" d-flex justify-content-center">
                  <button className="submit" type="submit">
                    Sign In
                  </button>
                </div>
                <p className=" d-flex justify-content-center">
                  Don't have an account? <a href="/doctor">Sign Up</a>
                </p>
              </form>
            </div>
          </Col>
          <Col className="bg">
            <div></div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DoctorSignin;
