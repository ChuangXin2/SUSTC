<?php
header("Content-type:text/html;charset=utf-8");
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" à la place de "mysql" qui est obsolète.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e paramètre si vous avez mis un mot de passe à root
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

// ²åÈëÊý¾Ý
$sql = "DROP TABLE traffic;";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('ÎÞ·¨¶ÁÈ¡Êý¾Ý: ' . mysqli_error($conn));
}
mysqli_close($conn);
?>