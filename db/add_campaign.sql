insert into Campaigns (name, image, message, status, userid)
  values($1, $2, $3, $4, $5)
  returning id;
