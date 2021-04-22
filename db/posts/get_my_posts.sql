SELECT *
FROM yaybaby_posts p
JOIN yaybaby_users u on u.id = p.user_id
WHERE p.user_id = $1;

-- not sure

-- INSERT INTO yaybaby_posts
-- (user_id, title, body, image, is_private)
-- VALUES
-- (17, "Here's my title", "Here's my body", "img.url", false);