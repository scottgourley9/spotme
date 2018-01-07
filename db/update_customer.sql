UPDATE Customers
SET firstname=$2,lastname=$3,phonenumber=$4,email=$5
WHERE id=$1;
