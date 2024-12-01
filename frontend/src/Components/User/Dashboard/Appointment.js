import React, { Component } from "react";
import NavBar from "./Navbar";
import AppointmentPage from "./AppointmentPage";

export default class Appointment extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AppointmentPage />
      </div>
    );
  }
}
