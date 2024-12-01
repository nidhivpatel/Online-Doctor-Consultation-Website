import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "../../Doctor/Dashboard/Chat.css";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ChatRoom from "./ChatRoom";
import io from "socket.io-client";

const ChatPage = () => {
  const socket = useRef();
  const [Chats, SetChats] = useState("");
  const [Chat, SetChat] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [room, SetRoom] = useState("");

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", user.id);
    }
  }, []);

  const handleClick = (cid) => {
    axios
      .post(
        "http://localhost:5000/chat/get",
        { id: cid },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data.chat);
        SetChat(response.data.chat);
      });
    SetRoom(cid);
  };

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/chat/uget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      }).then((response) =>
        response.json().then((data) => {
          SetChats(data);
        })
      );
    };
    fecthData();
  }, []);

  return (
    <div>
      <Row className="p-3">
        <Col xs={4}>
          {Object.keys(Chats)
            .filter((key) => key)
            .map((key, index) => {
              return (
                <div className="chat-card">
                  <div className="chats">
                    <div
                      onClick={() => {
                        handleClick(Chats[key]._id);
                      }}
                    >
                      Doctor Name : {Chats[key].doctorName}
                    </div>
                  </div>
                </div>
              );
            })}
        </Col>
        <Col>
          {room !== "" ? (
            <div>
              <ChatRoom room={room} chat={Chat} socket={socket} />
            </div>
          ) : (
            <center>
              <h3>Select a card to view the chat</h3>
            </center>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ChatPage;
