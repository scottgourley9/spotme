insert into Users(businessname, firstname, lastname, phonenumber, email, password, refcode, freetrial, freetrialstart)
  values($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning id, businessname, firstname, lastname, phonenumber, email, password, refcode;
