INSERT INTO yaybaby_users
(email, password, first_name, last_name, profile_pic)
VALUES
($1, $2, $3, $4, $5)
returning *;


