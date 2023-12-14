DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    listing_id INTEGER REFERENCES listings(id),
    isFavourite BOOLEAN
);