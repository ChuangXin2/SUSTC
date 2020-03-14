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
$midresult = json_decode($info);

// 插入数据
$sql = "
INSERT INTO traffic (block_Id, block_des, bound, expedite, congested, blocked, unknown, status, description, reg_date)
VALUES ";
for($i=0;$i<count($midresult);$i++){#
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
	if($i!=count($midresult)-1) {
		$sql .= "('$block_Id','$block_des', '$bound', '$expedite','$congested','$blocked','$unknown','$status','$description','$reg_date'),";
	}
	else {
		$sql .= "('$block_Id','$block_des', '$bound', '$expedite','$congested','$blocked','$unknown','$status','$description','$reg_date');";
	}
}

$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
else{
    echo $info;
}
mysqli_close($conn);
?>