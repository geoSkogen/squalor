<?php
class DB_Exec {

  public $table_name;
  public $table_cols;
  public $test_query;
  public $connection;

  function __construct() {
    $this->db_conn();
    $this->table_name = DB_TABLE;
    $this->table_cols =  "CREATE TABLE $this->table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      textspan text NOT NULL,
      items varchar(510) NOT NULL,
      PRIMARY KEY(id)
    )";
    $this->test_query = "SHOW TABLES LIKE '%{$this->table_name}'";
    print_r($this->query($this->test_query),true);
    if (!empty($this->query($this->test_query)===$this->table_name)) {
      echo 'db table found';
    } else {
      $resp = $this->query($this->table_cols);
      if ($resp) {
        echo 'your db table is created';
      } else {
        print($resp);
        print_r($this->query($this->test_query),true);
        echo 'an error occurred with table creation';
      }
    }
  }

  public function db_conn() {
    $this->connection = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    if ($this->connection->connect_errno) {
      die("db connect error: " . $this->connection->connect_errno . '<br/>');
    }

    if ($this->connection) {

    }
  }

  public function escape_string($string) {
    $escaped_str = $this->connection->real_escape_string($string);
    return $escaped_str;
  }

  public function query($sql) {
    $clean_str = $this->escape_string($sql);
    $result = $this->connection->query($sql);
    if (!$result) {
      print('query error:');
      print_r($result,true);
    }
    return $result;
  }

}
?>
