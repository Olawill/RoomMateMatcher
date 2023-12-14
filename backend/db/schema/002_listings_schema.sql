DROP TABLE IF EXISTS listings CASCADE;

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