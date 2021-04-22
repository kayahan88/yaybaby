CREATE TABLE yaybaby_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_created TIMESTAMP,
    profile_pic VARCHAR(3000)
);

CREATE TABLE yaybaby_posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER references yaybaby_users(id),
    title VARCHAR(1000) NOT NULL,
    body VARCHAR(3000) NOT NULL,
    image VARCHAR(3000),
    is_private BOOLEAN NOT NULL
);

CREATE TABLE yaybaby_post_comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER references yaybaby_users(id),
    post_id INTEGER references yaybaby_posts(post_id),
    text VARCHAR(3000),
    date_and_time TIMESTAMP
);

CREATE TABLE yaybaby_friends (
    user_id INTEGER references yaybaby_users(id),
    friend_id INTEGER references yaybaby_users(id),
    is_accepted BOOLEAN
);