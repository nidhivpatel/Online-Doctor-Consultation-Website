import React, { Component } from "react";
import NavBar from "./Navbar";
import ChatPage from "./ChatPage";

export default class Chat extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ChatPage />
      </div>
    );
  }
}
