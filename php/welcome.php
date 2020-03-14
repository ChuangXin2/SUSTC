<?php
header("Content-type:text/html;charset=utf-8");
function writeFile($row) {
	// 生成一个PHP数组
	$data = array();
	$data['id'] = $row['block_id'];
	$data['description'] = $row['block_des'];
	$data['expedite'] = $row['expedite'];
	$data['congested'] = $row['congested'];
	$data['blocked'] = $row['blocked'];
	$data['unknown'] = $row['unknown'];
	$data['status'] = $row['status'];
	$data['reg_date'] = $row['reg_date'];
	return $data;
}

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);
/*
$info = $_POST["info"];
$result = json_decode($info);

$block_Id = $result -> block_Id;
*/
if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
}
// and 
$sql = "select * from traffic where block_id=155 and unix_timestamp(reg_date)>unix_timestamp('2020-02-26 00:00:00');";# 
$retval = mysqli_query( $conn, $sql );
$data=array();

if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
	$item=array('block_Id'=>$row['block_id'],'block_des'=>urlencode($row["block_des"]),'bound'=>$row['bound'],	'expedite'=>$row["expedite"],'congested'=>$row["congested"],
	'blocked'=>$row["blocked"],'unknown'=>$row["unknown"],'status'=>$row["status"],'description'=>urlencode($row["description"]),'reg_date'=>$row["reg_date"]);
	echo urldecode(json_encode($item));
	array_push($data,$item);
}
$json=urldecode(json_encode($data));

mysqli_free_result($retval);
mysqli_close($conn);
?>
