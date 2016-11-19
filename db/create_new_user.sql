insert into Users(firstname, lastname, email, password)
  values($1, $2, $3, $4)
  returning id, firstname, lastname, email, password;
