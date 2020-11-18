<?php
class DB_Con {

  public $paths = [array('squalor'=>'sq_ua_l_or')];

  function __construct($uri) {
    $uri_arr = explode('/',$uri);
    $path_arr = [];
    $result = '';
    $lookup = 0;
    foreach($uri_arr as $val) {
      // ensure each slug of the URL is valid for routing
      if ($val) {
        $path_arr[] = $val;
      }
    }
    for ($i = 0; $i < count($path_arr); $i++) {
      //
      if ($this->paths[count($path_arr)-1][$path_arr[$i]]) {
        $lookup++;
      }
      // if the lookup was successful for each slug of the uri
      if (count($path_arr)-1===$i && $lookup===$i+1) {
        $result = $this->paths[count($path_arr)-1][$path_arr[$i]];
      }

    }
    if ($result) {
      $this->config($result);
    } else {
      print_r($uri_arr);
      print_r($path_arr);
      echo $result;
      print_r( $this->paths[count($path_arr)-1] );
      print_r( $this->paths[count($path_arr)-1][$path_arr[0]]) ;
      echo $lookup;
    }
  }

  function config($table_name) {
    $db_conn = array(
      'DB_USER'=>'squalid',
      'DB_PASSWORD'=>'sk.wal|0R',
      'DB_HOST'=>'localhost',
      'DB_NAME'=>'squalor',
      'DB_TABLE'=> $table_name
    );
    foreach($db_conn as $key => $val) {
      DEFINE ($key, $val);
    }
  }

}

?>
