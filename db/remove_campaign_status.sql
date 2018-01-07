UPDATE Campaigns
SET status=null
where userid = $1;
