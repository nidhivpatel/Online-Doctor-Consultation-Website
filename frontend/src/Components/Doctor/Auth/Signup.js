import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./SigninUp.css";

class DoctorSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      speciality: "",
      description: "",
      password: "",
      cpassword: "",
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
    const { name, email, speciality, description, password, cpassword } =
      this.state;
    // console.log(name, " ", email, " ", speciality, " ", description, " ", password, " ", cpassword);

    try {
      if (
        !(
          name &&
          email &&
          speciality &&
          description &&
          password &&
          cpassword &&
          password === cpassword
        )
      ) {
        alert("Invalid input");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/doctor/register",
        {
          name: name,
          email: email,
          speciality: speciality,
          description: description,
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
          alert("Doctor Registered Successfully!");
          window.location = "/doctor/login";
        } else {
          alert("Failed to Register the doctor.\n" + response.data.error);
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
                  <h3>SignUP</h3>
                  <h6>For Doctors</h6>
                </div>
                <div>
                  Username
                  <input
                    type="text"
                    placeholder="Username"
                    className="input"
                    name="name"
                    value={this.name}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Email
                  <input
                    type="text"
                    placeholder="Email"
                    className="input"
                    name="email"
                    value={this.email}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Speciality
                  <input
                    type="text"
                    placeholder="Speciality"
                    className="input"
                    name="speciality"
                    value={this.speciality}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Description
                  <input
                    type="text"
                    placeholder="Description"
                    className="input"
                    name="description"
                    value={this.description}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Password
                  <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    name="password"
                    value={this.password}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  Confirm Password
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input"
                    name="cpassword"
                    value={this.cpassword}
                    onChange={this.onChange}
                  />
                </div>
                <div className=" d-flex justify-content-center">
                  <button className="submit" type="submit">
                    Sign Up
                  </button>
                </div>
                <p className=" d-flex justify-content-center">
                  Already have an account? <a href="/doctor/login">Sign In</a>
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

export default DoctorSignup;
