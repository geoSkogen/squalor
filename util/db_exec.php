<?php
class DB_Exec {

  public $table_name;
  public $table_cols;
  public $test_query;
  public $connection;
  public $weird_spec = ' refer to https://github.com/geoSkogen/squalor/issues/1 for the likely primary source of this error';

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
    //print_r($this->query($this->test_query),true);
    if ($this->query($this->test_query)->num_rows>0) {
      echo '<span class="db_msg"> database table found; </span>';
    } else {
      $resp = $this->query($this->table_cols);
      if ($resp) {
        echo '<span class="db_msg">your database table has been created</span>';
      } else {
        echo '<span class="db_msg"> an error occurred with table creation; ' . $this->weird_spec .  '</span>';
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
      print('<span class="db_msg"> query error; </span>');
      print_r($result,true);
    }
    return $result;
  }

}
?>
