import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Message from "./message";

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
    } else {
      // The chatroom doesn't exist, so create a new one
      const userData = sessionStorage.getItem("userData");
      const userInfo = JSON.parse(userData);
  
      axios.post("/api/chatrooms", { listing_id: chatroom.listing_id })
        .then(response => {
          const newChatroom = response.data.data;
  
          // Associate the current user with the chatroom
          axios.post(`/api/chatrooms/${newChatroom.id}/users`, { user_id: userInfo.userId })
            .then(() => {
              // Associate the other user with the chatroom (replace 'otherUserId' with the actual user ID)
              axios.post(`/api/chatrooms/${newChatroom.id}/users`, { user_id: 1 })
                .then(() => {
                  setSelectedChatroom(newChatroom);
                })
                .catch(error => {
                  console.error("Error associating other user with chatroom:", error);
                });
            })
            .catch(error => {
              console.error("Error associating user with chatroom:", error);
            });
        })
        .catch(error => {
          console.error("Error creating chatroom:", error);
        });
    }
  };
  

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Chatrooms</h2>
        <ul>
          {chatrooms.map((chatroom) => (
            <li key={chatroom.id} onClick={() => handleChatroomSelect(chatroom)}>
              {chatroom.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedChatroom && (
        <Message
          socket={socket}
          username={username}
          room={selectedChatroom.id}
        />
      )}
    </div>
  );
}

export default ChatroomList;
