import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [room, setRoom] = useState("privateRoom");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user, isAuthenticated } = useAuth0();
  console.log('this is user', user)

  useEffect(() => {
    const newSocket = io("http://localhost:8003");
    setSocket(newSocket);
    // const user = prompt("Enter your name:");
    setSender(user?.nickname);

    const otherUser = prompt("Enter the recipient name:");
    setRecipient(otherUser);

    // Join the room
    newSocket.emit("join", room);

    // component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [room, user]);

  // sending messages
  const sendMessage = () => {
    const content = prompt("Enter your message:");
    socket.emit("message", { senderId : user.sub, recipient, content, room });
  };

  // receiving messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        console.log(`${data.sender}: ${data.content}`);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  // handling message input
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // replying to messages
  const replyToMessage = () => {
    socket.emit("message", { sender, recipient, content: newMessage, room });
    setNewMessage("");
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.sender}: {message.content}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={newMessage}
        onChange={handleNewMessageChange}
      />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={replyToMessage}>Reply to Message</button>
    </div>
  );
};

export default Chat;
