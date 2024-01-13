import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Message from "./message";
import "./ChatroomListing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NoChatrooms from "./NoChatrooms";


function ChatroomList() {
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  

  const userData = sessionStorage.getItem("userData");
  const userInfo = JSON.parse(userData);

  useEffect(() => {

    if (userInfo) { 
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

    // Listen for new messages and update the message list
    function onReceiveMessage(data) {
      setMessages((list) => [...list, data]);
    }

    newSocket.on("receive_message", onReceiveMessage);

    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.off("receive_message", onReceiveMessage);
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

          const roomData = {
            roomId: chatroom.id,
            userId: userInfo.userId
          }
          socket.emit("join_room", roomData);
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    } 
  };

  const sendMessage = async (currentMessage) => {
    if (currentMessage.trim() !== "") {
      const userData = sessionStorage.getItem("userData");
      const userInfo = JSON.parse(userData);
      const messageData = {
        sender_id: userInfo.userId,
        recipient_id: selectedChatroom.user1_id === userInfo.userId? selectedChatroom.user2_id : selectedChatroom.user1_id,
        chatroom_id: selectedChatroom.id,
        content: currentMessage,
        checked: true,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        author: userInfo.username,
      };

      socket.emit("send_message", messageData);

    }
  };

  // DESELECT ALL ROOMS WHEN CLICKED
  const handleHome = () => {
    setSelectedChatroom(null);
  };
  

  return (
    <>
    {
      chatrooms.length === 0 && (
        <NoChatrooms />
      )
    }
    {
      chatrooms.length > 0 && (
      <div className="chat-container">
        <div className="sidebar">
          <h4
            onClick={handleHome}
            style={{textTransform: 'uppercase'}}
          >
            Chatrooms
          </h4>
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
            <h4 style={{textAlign: "left"}}>
            {
                  selectedChatroom ? selectedChatroom.name : 
                  <>
                  <img src="logo.png" alt="Roommate Matcher" style={{
                    height: "3rem",
                    borderRadius: '50%',
                  }}/>
                {" Welcome to RooMMate Matcher"}
                  </>
                }
            </h4>
          </div>

          <div className={`chat-messages ${!selectedChatroom ? "chat-none" : ""}`}>
            {selectedChatroom && (
              <Message
                sendMessage={sendMessage}
                username={username}
                room={selectedChatroom.id}
                messageList ={messages} />
            )}
            {!selectedChatroom && (
                <p className="no-room">Please select a chat room to start sending messages.</p>
              )}
          </div>
        </div>
      </div>
      )
    }
    </>
  );
}

export default ChatroomList;
