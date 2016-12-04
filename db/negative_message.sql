UPDATE messages
SET clicked= true,negative=true, positive=false
WHERE id=$1;
