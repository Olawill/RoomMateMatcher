DROP TABLE IF EXISTS chatrooms CASCADE;

CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);