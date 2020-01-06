<?php
header("Content-type:text/html;charset=utf-8");
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" à la place de "mysql" qui est obsolète.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e paramètre si vous avez mis un mot de passe à root
*/

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("connect errpr: " . $conn->connect_error);
} 

// ²åÈëÊý¾Ý
$sql = "DROP TABLE traffic";
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('ÎÞ·¨¶ÁÈ¡Êý¾Ý: ' . mysqli_error($conn));
}
mysqli_close($conn);
?>