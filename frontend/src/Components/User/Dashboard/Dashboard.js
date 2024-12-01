import NavBar from "./Navbar";
import Search from "./Search";
import React, { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Search />
      </div>
    );
  }
}
