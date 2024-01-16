import React, { useState } from "react";
import ChatroomList from "./chatroomList";
import PageLayout from "../PageLayout/PageLayout";

function MyMessage() {
  const [setSelectedChatroom] = useState(null);

  const handleChatroomSelect = (chatroom) => {
    setSelectedChatroom(chatroom);
  };

  return (
    <PageLayout requireAuthentication={true}>
      {({ theme }) => (
        <div
          className="container"
          style={{ marginBottom: '2rem' }}
          data-theme={theme}
        >
          <ChatroomList onSelectChatroom={handleChatroomSelect} />
        </div>
      )}
    </PageLayout>
  );
}

export default MyMessage;
