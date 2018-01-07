update users
set businessname = $2, firstname = $3, lastname = $4, phonenumber = $5, email = $6, paid = $7, admin = $8, freetrial = $9, freetrialstart = $10
where id = $1
