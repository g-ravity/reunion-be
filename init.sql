CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follow (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id) NOT NULL,
    following_id INTEGER REFERENCES users(id) NOT NULL,
    UNIQUE(follower_id, following_id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    UNIQUE(post_id, user_id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);