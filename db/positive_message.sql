UPDATE messages
SET clicked= true,positive=true, negative = false
WHERE id=$1;
