DROP TABLE IF EXISTS chatrooms CASCADE;

CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER REFERENCES users(id),
    user2_id INTEGER REFERENCES users(id),
    name VARCHAR(255)
);