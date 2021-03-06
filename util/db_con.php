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
    //print_r($path_arr);
    for ($i = 0; $i < count($path_arr); $i++) {
      //
      if ($this->paths[count($path_arr)-1][$path_arr[$i]]) {
        $lookup++;
      }
      // if the lookup was successful for each slug of the uri . . .
      // e.g. if you add a /love/ or love.php endpoint at {host}/hope/love -
      // there has to be a valid /hope/ endpoint and DB_Con::$paths[0]['hope'],
      // before a DB_Con::$paths[1]['love'] will validate for table creation.
      if (count($path_arr)-1===$i && $lookup===$i+1) {
        $result = $this->paths[count($path_arr)-1][$path_arr[$i]];
      }

    }
    if ($result) {
      $this->config($result);
    } else {
      echo "<h1>REST path queen mother of all errors* - here's your plate of spaghetti (I hope) :</h1>";
      print_r($uri_arr);
      print_r($path_arr);
      echo $result;
      print_r( $this->paths[count($path_arr)-1] );
      print_r( $this->paths[count($path_arr)-1][$path_arr[0]]) ;
      echo $lookup;
      echo "<h2> got issues? go here: https://github.com/geoSkogen/squalor/issues/ </h2>";
      echo "<h3>*FAQ: Did you run an executable file instead of requesting its resource from an HTTP client? Try that instead.</h3>";
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
