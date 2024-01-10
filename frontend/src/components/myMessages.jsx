import React, { useState } from "react";
import ChatroomList from "./chatroomList";
import PageLayout from "./PageLayout/PageLayout";

function MyMessage() {
  const [setSelectedChatroom] = useState(null);

  const handleChatroomSelect = (chatroom) => {
    setSelectedChatroom(chatroom);
  };

  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <div
          className="container"
          data-theme={theme === "Auto" ? getThemeAuto() : theme}
        >
          <ChatroomList onSelectChatroom={handleChatroomSelect} />
        </div>
      )}
    </PageLayout>
  );
}

export default MyMessage;
