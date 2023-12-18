import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [room, setRoom] = useState('privateRoom');

  useEffect(() => {
    const newSocket = io('http://localhost:8003');
    setSocket(newSocket);

    const user = prompt('Enter your name:');
    setSender(user);

    const otherUser = prompt('Enter the recipient name:');
    setRecipient(otherUser);

    // Join the room
    newSocket.emit('join', room);

    // component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  // sending messages
  const sendMessage = () => {
    const content = prompt('Enter your message:');
    socket.emit('message', { sender, recipient, content, room });
  };

  // receiving messages
  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        console.log(`${data.sender}: ${data.content}`);
      });
    }
  }, [socket]);

  return (
    <div>
      
      <h1>Socket.IO Chat</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Chat;
