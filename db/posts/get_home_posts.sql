SELECT *
FROM yaybaby_posts p
JOIN yaybaby_users u on u.id = p.user_id
WHERE is_private IS false;

--not sure