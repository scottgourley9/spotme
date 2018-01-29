insert into Campaigns (name, image, message, status, userid, linkcampaign)
  values($1, $2, $3, $4, $5, $6)
  returning id;
