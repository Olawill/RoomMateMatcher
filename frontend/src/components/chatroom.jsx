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
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuth0();
  console.log('this is user', user)

  useEffect(() => {
    const newSocket = io("http://localhost:8003");
    setSocket(newSocket);

    setSender(user?.nickname);

    // Join the room
    newSocket.emit("join", room);

    // Component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [room, user]);

  // Sending a private chat request
  const sendPrivateChatRequest = () => {
    socket.emit('privateChatRequest', { recipientId, recipientName });
  };

  // Accepting a private chat request
  const acceptPrivateChatRequest = () => {
    socket.emit('privateChatAccept', { senderId, senderName, roomId });
  };

  // Sending a private chat message
  const sendPrivateChatMessage = () => {
    socket.emit('privateChatMessage', { roomId, content });
  };

  // Receiving a private chat message
  useEffect(() => {
    if (socket) {
      socket.on('privateChatMessage', ({ roomId, senderName, content }) => {
        io.to(roomId).emit('privateChatMessage', { senderName, content });
      });
    }
  }, [socket]);

  // Sending messages
  const sendMessage = () => {
    const content = prompt("Enter your message:");
    socket.emit("message", { sender, recipient, content, room });
  };

  // Replying to messages
  const startReplying = () => {
    setIsReplying(true);
    const otherUser = prompt("Enter the recipient name:");
    setRecipient(otherUser);
  };

  const replyToMessage = () => {
    socket.emit("message", { sender, recipient, content: newMessage, room });
    setNewMessage("");
    setIsReplying(false);
  };

  // Receiving messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        console.log(`${data.sender}: ${data.content}`);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  // Handling message input
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
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
      {isReplying && (
        <>
          <input
            type="text"
            placeholder="Enter recipient name"
            value={recipient}
            disabled
          />
        </>
      )}
      <input
        type="text"
        placeholder="Type your message"
        value={newMessage}
        onChange={handleNewMessageChange}
      />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={startReplying}>Reply to Message</button>
      {isReplying && <button onClick={replyToMessage}>Send Reply</button>}
    </div>
  );
};

export default Chat;
