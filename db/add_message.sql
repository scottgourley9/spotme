insert into messages (senttime, message, linkid, userid, customerid, linktype)
  values($1, $2, $3, $4, $5, $6)
  returning id;
