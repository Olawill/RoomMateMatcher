
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    chatroom_id INTEGER REFERENCES chatrooms(id),
    content TEXT,
    checked BOOLEAN,
    created_at TIMESTAMP,
    read_at TIMESTAMP
);

