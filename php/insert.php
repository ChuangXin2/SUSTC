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

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
} 

$block_Id = 4;
$block_des = '���廷����Է�Ÿ����Զ�������ʻ������';
$clear = 33.33;
$amble = 33.33;
$block = 33.33;
$unkown = 0.01;
$bound = '116.397202,39.989953;116.406211,39.980944';

// ��������
$sql = "
INSERT INTO test (block_Id, block_des, bound, clear, amble, block, unkown, reg_date)
VALUES 
('$block_Id','$block_des', '$bound', '$clear','$amble','$block','$unkown','2019-12-20 16:00:00');";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('�޷���ȡ����: ' . mysqli_error($conn));
}
else{
    echo "Insert created successfully";
}
mysqli_close($conn);
?>