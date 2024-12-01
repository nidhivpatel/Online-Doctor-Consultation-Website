import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
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
    const { name, email, password, cpassword } = this.state;
    // console.log(name, " ", email, " ", password, " ", cpassword);

    try {
      if (!(name && email && password && cpassword && password === cpassword)) {
        alert("Invalid input");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/user/register",
        { name: name, email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data.status === "ok") {
          alert("User Registered Successfully!");
          window.location = "/login";
        } else {
          alert("Failed to Register the user.\n" + response.data.error);
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
                  <h6>Create account and book your appointment</h6>
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
                  Already have an account? <a href="/login">Sign In</a>
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

export default Signup;
