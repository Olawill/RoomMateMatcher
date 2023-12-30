import React, { useState } from "react";
import ChatroomList from "./chatroomList";

function MyMessage() {
  const [setSelectedChatroom] = useState(null);

  const handleChatroomSelect = (chatroom) => {
    setSelectedChatroom(chatroom);
  };

  return (
    <div className="container">
      <ChatroomList onSelectChatroom={handleChatroomSelect} />
    </div>
  );
}

export default MyMessage;
