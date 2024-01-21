DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS chatrooms CASCADE;
DROP TABLE IF EXISTS users_chatrooms CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    image_URL VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    sub VARCHAR(255),
    isDeleted BOOLEAN DEFAULT FALSE
);



CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    description TEXT,
    number_of_rooms INTEGER,
    number_of_roommates INTEGER,
    preference VARCHAR(255),
    status VARCHAR(255),
    price NUMERIC,
    postal_code VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);



CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER REFERENCES users(id),
    user2_id INTEGER REFERENCES users(id),
    name VARCHAR(255)
);

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




CREATE TABLE favourites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    listing_id INTEGER REFERENCES listings(id),
    isFavourite BOOLEAN
);



CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    listing_id INTEGER REFERENCES listings(id),
    review TEXT,
    rating INTEGER,
    created_at TIMESTAMP
);







CREATE TABLE users_chatrooms (
    user_id INTEGER REFERENCES users(id),
    chatroom_id INTEGER REFERENCES chatrooms(id),
    PRIMARY KEY (user_id, chatroom_id)
);