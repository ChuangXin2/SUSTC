<?php
header("Content-type:text/html;charset=utf-8");
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" � la place de "mysql" qui est obsol�te.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e param�tre si vous avez mis un mot de passe � root
*/

$servername = "172.16.0.14";
$username = "root";
$password = "@Sustc161827";
$dbname = "SUSTC";
$port = "10125";

$conn = new mysqli($servername, $username, $password, $dbname);

mysqli_query($conn,'set names uft8');

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
} 


$info = $_POST["info"];
$midresult = json_decode($info);
/*
$result = $midresult[2];
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

for($i=0;$i<4;$i++){	#count($midresult)
    $result = $midresult[$i];
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
	$json=urldecode(json_encode($data));
}

// 插入数据
$sql = "
INSERT INTO traffic (block_Id, block_des, bound, expedite, congested, blocked, unknown, status, description, reg_date)
VALUES 
('$block_Id','$block_des', '$bound', '$expedite','$congested','$blocked','$unknown','$status','$description','$reg_date');";
*/
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo $info;
mysqli_close($conn);
?>