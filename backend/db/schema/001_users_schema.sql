DROP TABLE IF EXISTS users CASCADE;


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