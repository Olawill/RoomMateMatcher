import { useEffect, useState } from "react";
// import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Message.css";
import { BsFillSendFill } from 'react-icons/bs';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import { Dropdown, DropdownButton } from "react-bootstrap";

function Message({ sendMessage, username, messageList }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const submitMessage = (input) => {
    sendMessage(input);
    setCurrentMessage("");
    setSelectedEmoji(null);
    setShowEmojiPicker(false);
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
        <DropdownButton
          key='up-centered'
          role="img"
          aria-label="emoji-picker"
          style={{marginInline: '0.2rem'}}
          id="dropdown-emoji"
          drop='start-centered'
          variant="light"
          title={<BsEmojiSmile />}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Dropdown.Item onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          {
            showEmojiPicker && (
              <EmojiPicker
                theme="dark"
                lazyLoadEmojis
                onEmojiClick={(res) => {
                  setSelectedEmoji(res);
                  setCurrentMessage(currentMessage + res.emoji);br
                }}
              />
            )
          }
          </Dropdown.Item>
        </DropdownButton>
        <button
          id="message-button"
          onClick={ () => submitMessage(currentMessage)}>
            <BsFillSendFill /> Send
        </button>
      </div>
    </div>
  );
}

export default Message;
