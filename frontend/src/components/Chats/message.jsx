import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Message.css";
import { BsFillSendFill } from 'react-icons/bs';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoPersonSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import { Dropdown, DropdownButton, Stack } from "react-bootstrap";

function Message({ sendMessage, username, messageList }) {
  const { user, isAuthenticated } = useAuth0();

  const [currentMessage, setCurrentMessage] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const submitMessage = (input) => {
    sendMessage(input);
    setCurrentMessage("");
    setSelectedEmoji(null);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (res) => {
    setSelectedEmoji(res);
    setCurrentMessage((prev) => prev + res.emoji);
  };

  const selectProfileImage = () => {
    if (!isAuthenticated || !user?.picture) return;
    return user?.picture;
  }

  const currentTheme = window.sessionStorage.getItem('appTheme');

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <Stack className="message-container">
          {messageList.map((messageContent) => (
            <div
              className="message"
              key={messageContent.id}
              id={username === messageContent.author ? "you" : "other"}
            >
              <div className="message-image">
                <div></div>
                <div className="image-item">
                  {
                    messageContent.picture
                    ? <img
                        src={messageContent.picture}
                        style={{
                          width: '30px', height: '30px'
                        }}
                        alt="user-image" />
                    : <IoPersonSharp
                        style={{
                          width: '20px', height: '20px',
                          borderRadius: '50%',
                          border: '1px solid green'
                        }}
                      />
                  }
                </div>
              </div>
              <div className="message-content">
                <p>{messageContent.content}</p>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                  <p id="time">{moment(messageContent.created_at).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
        </Stack>
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
          variant={currentTheme === 'Dark' ? 'dark' : 'Light'}
          title={<BsEmojiSmile />}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            {
              showEmojiPicker && (
                <EmojiPicker
                  theme={currentTheme === 'Dark' ? 'dark' : 'Light'}
                  onEmojiClick={handleEmojiClick}
                />
              )
            }
            </Dropdown.Item>

          </Dropdown.Menu>
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
