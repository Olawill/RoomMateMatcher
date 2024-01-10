import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import "../Message.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

function Message({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Fetch old messages for the chatroom from the server when the component mounts
    axios.get(`/api/chatrooms/${room}/messages`)
      .then(response => {
        const messagesArray = response.data?.data || [];
        setMessageList(messagesArray);
      })
      .catch(error => {
        console.error("Error fetching messages:", error);
      });

    // Listen for new messages and update the message list
    function onReceiveMessage(data) {
      setMessageList((list) => [...list, data]);
    }

    socket.on("receive_message", onReceiveMessage);

    return () => {
      // Clean up the socket event listener when the component unmounts
      socket.off("receive_message", onReceiveMessage);
    };
  }, [socket, room]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const userData = sessionStorage.getItem("userData");
      const userInfo = JSON.parse(userData);
      const messageData = {
        sender_id: userInfo.userId,
        recipient_id: 2, 
        chatroom_id: room,
        content: currentMessage,
        checked: true,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        author: userInfo.username,
      };

      // Emit 'send_message' event to the server
      socket.emit("send_message", messageData);

      // Update the message list with the new message
      setMessageList((list) => [...list, messageData]);


      setCurrentMessage("");
    }
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <div
              className="message"
              key={messageContent.id}
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.content}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{messageContent.sender_id}</p>
                  <p id="time">{moment(messageContent.created_at).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button id="message-button" onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Message;
