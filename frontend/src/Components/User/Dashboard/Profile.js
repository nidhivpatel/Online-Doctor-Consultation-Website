import React, { Component, useState, useEffect } from "react";
import { Row, Col, Navbar, Container, Nav } from "react-bootstrap";
import "./Profile.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.user.id;
    this.state = {
      name: "",
      email: "",
    }
    this.store = this.store.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  store() {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: this.id,
        name: this.name,
        email: this.email,
      })
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      // if (this.name && this.email) {
        axios
          .post(
            "http://localhost:5000/user/edit",
            { id: this.id, name: this.name, email: this.email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "ok") {
              this.store();
              this.name = "";
              this.email = "";
              alert("Information Updated!!");
              window.location.reload(false);
            } else {
              alert(response.data.error);
            }
          });
      // }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

  render() {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/login"
              onClick={(e) => {
                localStorage.removeItem("user");
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/profile">
              <Nav.Link href="/profile">
                <FaUserCircle />{" "}
                {"Hello " + JSON.parse(localStorage.getItem("user")).name}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <Row>
        <Col className="account1">
          <div>
            <form className="account-form" onSubmit={this.handleSubmit}>
              <div>
                <h3>Profile</h3>
              </div>
              <div>
              {console.log(this.props.user.name)}
                Username : {this.props.user.name}
                <input
                  type="text"
                  className="input"
                  value={this.name}
                  onChange={(e) => {
                    this.name = e.target.value;
                  }}
                />
              </div>
              <div>
                Email : {this.props.user.email}
                <input
                  type="text"
                  className="input"
                  value={this.email}
                  onChange={(e) => {
                    this.email = e.target.value;
                  }}
                />
              </div>
              <div className=" d-flex justify-content-center">
                <button className="submit" type="submit">
                  Save
                </button>
              
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
  }
};

export default Profile;
