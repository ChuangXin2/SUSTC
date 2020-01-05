<?php
header("Content-type:text/html;charset=utf-8");
function writeFile($row) {
	// 生成一个PHP数组
	$data = array();
	$data['id'] = $row['block_id'];
	$data['description'] = $row['block_des'];
	$data['clear'] = $row['clear'];
	$data['amble'] = $row['amble'];
	$data['block'] = $row['block'];
	$data['unkown'] = $row['unkown'];
	$data['reg_date'] = $row['reg_date'];
	return $data;
}

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
}

$sql = "select * from test;";
$retval = mysqli_query( $conn, $sql );
$data = array();
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>占比</td><td>占比</td><td>占比</td><td>占比</td><td>日期</td></tr>';
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
	echo "<tr><td> {$row['block_id']}</td> ".
		 "<td>{$row['block_des']} </td> ".
		 "<td>{$row['bound']} </td> ".
		 "<td>{$row['clear']} </td> ".
		 "<td>{$row['amble']} </td> ".
		 "<td>{$row['block']} </td> ".
		 "<td>{$row['unkown']} </td> ".
		 "<td>{$row['reg_date']} </td> ".
		 "</tr>";
	$data = writeFile($row);
}
echo '</table>';

mysqli_close($conn);
?>
