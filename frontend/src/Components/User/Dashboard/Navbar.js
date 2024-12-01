import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
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
    );
  }
}
