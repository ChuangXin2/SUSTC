<?php
header("Content-type:text/html;charset=utf-8");
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" à la place de "mysql" qui est obsolète.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e paramtere si vous avez mis un mot de passe à root
*/

$servername = "172.16.0.14";
$username = "root";
$password = "@Sustc161827";
$dbname = "SUSTC";
$port = "10125";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
} 

$sql = "CREATE TABLE traffic (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
block_id int(3),
block_des VARCHAR(500),
bound VARCHAR(50) NOT NULL,
expedite VARCHAR(15),
congested VARCHAR(15),
blocked VARCHAR(15),
unknown VARCHAR(15),
status int(1),
description VARCHAR(50),
reg_date TIMESTAMP NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";

if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "create datebase wrong: " . $conn->error;
}

mysqli_close($conn);
?>