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
$time1 = $result -> time1;
$time2 = $result -> time2;

// 插入数据
$sql = "select * from traffic where block_id=$block_Id and unix_timestamp(reg_date)>unix_timestamp('$time1') and unix_timestamp(reg_date)<unix_timestamp('$time2');";

$retval = mysqli_query( $conn, $sql);
$data=array();
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
else{
	while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
		$arrInfo=array();
		$item=array('block_Id'=>$row['block_id'],'block_des'=>urlencode($row["block_des"]),'bound'=>$row['bound'],	'expedite'=>$row["expedite"],'congested'=>$row["congested"],
		'blocked'=>$row["blocked"],'unknown'=>$row["unknown"],'status'=>$row["status"],'description'=>urlencode($row["description"]),'reg_date'=>$row["reg_date"]);
		array_push($data,$item);
	}
	$json=urldecode(json_encode($data)) ;
	echo $json;
}
mysqli_close($conn);
?>