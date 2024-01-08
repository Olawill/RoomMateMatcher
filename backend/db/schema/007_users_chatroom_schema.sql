DROP TABLE IF EXISTS users_chatrooms CASCADE;

CREATE TABLE users_chatrooms (
    user_id INTEGER REFERENCES users(id),
    chatroom_id INTEGER REFERENCES chatrooms(id),
    PRIMARY KEY (user_id, chatroom_id)
);