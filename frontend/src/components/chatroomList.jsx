import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Message from "./message";
import "../ChatroomListing.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatroomList() {
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const userInfo = JSON.parse(userData);
      if (userInfo.username) {
        setUsername(userInfo.username);
      }
      if (userInfo.userId) {
        setUserId(userInfo.userId);
      }
    }
  }, []);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:8003");
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch chatrooms from the server
    if (userId) {
      axios.get(`/api/chatrooms/${userId}`)
        .then(response => {
          const chatroomsArray = response.data?.data || [];
          setChatrooms(chatroomsArray);
        })
        .catch(error => {
          console.error("Error fetching chatrooms:", error);
        });
    }
  }, [userId]);

  const handleChatroomSelect = (chatroom) => {
    if (chatroom.id) {
      axios.get(`/api/chatrooms/${chatroom.id}/messages`)
        .then(response => {
          const messagesArray = response.data?.data || [];
          setMessages(messagesArray);
          setSelectedChatroom(chatroom);
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    } 
  };
  

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Chatrooms</h2>
        <ul>
          {chatrooms.map((chatroom) => (
            <li
              key={chatroom.id}
              data-chatroomname={chatroom.name}
              onClick={() => handleChatroomSelect(chatroom)}>
              {chatroom.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>{selectedChatroom ? selectedChatroom.name : 'Select a Chatroom'}</h2>
        </div>

        <div className="chat-messages">
          {selectedChatroom && (
            <Message socket={socket} username={username} room={selectedChatroom.id} />
          )}
        </div>

        <div className="chat-input">
          {/* Your chat input component can go here */}
          {/* Example: <ChatInput sendMessage={sendMessage} /> */}
        </div>
      </div>
    </div>
  );
}

export default ChatroomList;
