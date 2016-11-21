insert into Users(businessname, firstname, lastname, phonenumber, email, password)
  values($1, $2, $3, $4, $5, $6)
  returning id, businessname, firstname, lastname, phonenumber, email, password;
