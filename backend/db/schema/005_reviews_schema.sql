DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    listing_id INTEGER REFERENCES listings(id),
    review TEXT,
    rating INTEGER,
    created_at TIMESTAMP
)