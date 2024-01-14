import { useEffect, useRef, useState } from "react";
import InputEmoji from 'react-input-emoji';
import "./Message.css";
import { BsFillSendFill } from 'react-icons/bs';
import { IoPersonSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import { Stack } from "react-bootstrap";

function Message({ sendMessage, username, messageList }) {

  const messagesContainerRef = useRef(null);

  const inputRef = useRef(null);

  const [currentMessage, setCurrentMessage] = useState("");
  
  const currentTheme = window.sessionStorage.getItem('appTheme');

  const submitMessage = (input) => {
    sendMessage(input);
    setCurrentMessage("");
  };


  // SCROLL TO THE LAST MESSAGE FOR EACH ROOM
  useEffect(() => {
    const scrollToBottom = () => {
  
      if (messagesContainerRef.current && messageList.length > 0) {
      
        const lastMessage = messagesContainerRef.current.lastChild;

        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();

    // focusInput()
  }, [messageList]);

  const hanleEnterkey = (event) => {
    event.preventDefault();

    submitMessage(currentMessage);
  };


  // PUT CURSOR IN THE INPUT FIELD
  const focusInput = () => {
    if (inputRef.current) {
      inputRef?.current.focus();
    }
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <Stack className="message-container" ref={messagesContainerRef}>
          {messageList.map((messageContent) => (
            <div
              key={messageContent.id}
              className="message"
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
          <InputEmoji
            ref={inputRef}
            onChange={setCurrentMessage}
            borderColor='rgb(36,32,32)'
            fontSize={16}
            value={currentMessage}
            theme={currentTheme === 'Dark' ? 'dark' : 'Light'}
            cleanOnEnter
            onEnter={hanleEnterkey}
          />
        <button
          id="message-button"
          style={{width: '6rem'}}
          onClick={ () => submitMessage(currentMessage)}>
            <BsFillSendFill /> Send
        </button>
      </div>
    </div>
  );
}

export default Message;
