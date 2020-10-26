<?php
DEFINE ('DB_USER', 'squalid');
DEFINE ('DB_PASSWORD', 'sk.wal|0R');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'squalor');

$dbcon = @mysqli_connect (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
  OR die ('could not connect to mysql: ' . mysqli_connect_error());
mysqli_set_charset($dbcon, 'utf8');
?>
