<?php
header("Content-type:text/html;charset=utf-8");

$servername = "cdb-ef3lz554.cd.tencentcdb.com:10125";
$username = "root";
$password = "@Sustc161827";
$dbname = "SUSTC";
$port = "10125";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("连接错误: " . mysqli_connect_error(); 
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