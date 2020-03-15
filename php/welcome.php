<?php
$random_code_post =999888;
$command = 'python ..\py\drop.py ' . $random_code_post;
 
#$python = shell_exec($command);
$python = `$command`;
$json = urldecode(json_encode($python));
echo $json;
?>
