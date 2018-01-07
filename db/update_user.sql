UPDATE Users
SET businessname=$2,firstname=$3,lastname=$4,phonenumber=$5,email=$6
WHERE id=$1;
