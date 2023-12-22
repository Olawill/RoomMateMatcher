import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./message";

const socket = io.connect("http://localhost:8003");

const NewChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const userInfo = JSON.parse(userData);
      if(userInfo.username){
      setUsername(userInfo.username);
      }
    }
  }, []);
  

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Message socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default NewChat;
