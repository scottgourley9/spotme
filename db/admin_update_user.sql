update users
set businessname = $2, firstname = $3, lastname = $4, phonenumber = $5, email = $6, paid = $7, admin = $8
where id = $1
