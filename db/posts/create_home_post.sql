INSERT INTO yaybaby_posts
(user_id, title, body, image, is_private)
VALUES($1, $2, $3, $4, $5);
SELECT *
FROM yaybaby_posts
WHERE is_private IS false AND user_id = $1;

--The two different creates and edits were because of the data I needed brought back.