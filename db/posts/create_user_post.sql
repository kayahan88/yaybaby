INSERT INTO yaybaby_posts
(user_id, title, body, image, is_private)
VALUES($1, $2, $3, $4, $5);
SELECT *
FROM yaybaby_posts
WHERE user_id = $1;