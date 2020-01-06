<?php
header("Content-type:text/html;charset=utf-8");
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" � la place de "mysql" qui est obsol�te.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e param�tre si vous avez mis un mot de passe � root
*/

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

mysqli_query($conn,'set names uft8');

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
} 

$info = $_POST["info"];
$result = json_decode($info);

$block_Id = $result -> block_Id;
$block_des = $result -> block_des;
$bound = $result -> bound;
$expedite = $result -> expedite;
$congested = $result -> congested;
$blocked = $result -> blocked;
$unknown = $result -> unknown;
$status = $result -> status;
$description = $result -> description;
$reg_date = $result -> reg_date;

echo $result -> bound;

/*
$block_Id = 4;
$block_des = '北五环：北苑桥附近自东向西行驶缓慢。';
$expedite = '33.33%';
$congested = '33.33%';
$blocked = '33.33%';
$unknown = '0.01%';
$status = 2;
$bound = '116.397202,39.989953;116.406211,39.980944';
$description = '整体畅通';
*/

// 插入数据
/*
$sql = "
INSERT INTO traffic (block_Id, block_des, bound, expedite, congested, blocked, unknown, description, reg_date)
VALUES 
('$block_Id','$block_des', '$bound', '$expedite','$congested','$blocked','$unknown','$description','2019-12-20 16:00:00');";
*/
$sql = "
INSERT INTO traffic (block_Id, block_des, bound, expedite, congested, blocked, unknown, status, description, reg_date)
VALUES 
('$block_Id','$block_des', '$bound', '$expedite','$congested','$blocked','$unknown','$status','$description','$reg_date');";

$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
else{
    echo "Insert created successfully";
}
mysqli_close($conn);
?>