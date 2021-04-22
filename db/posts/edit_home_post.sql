UPDATE yaybaby_posts
JOIN yaybaby_users u on u.id = p.user_id
SET title = $1, body = $2, image = $3, is_private = $4
WHERE user_id = $5 AND post_id = $6;
SELECT *
FROM yaybaby_posts
WHERE is_private IS false AND user_id = $5;