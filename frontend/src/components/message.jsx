import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import "../Message.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

function Message({ sendMessage, username, messageList }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const submitMessage = (input) => {
    sendMessage(input)
    setCurrentMessage("")
  }
  
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
            event.key === "Enter" && submitMessage(currentMessage);
          }}
        />
        <button id="message-button" onClick={ () => submitMessage(currentMessage)}>&#9658;</button>
      </div>
    </div>
  );
}

export default Message;
