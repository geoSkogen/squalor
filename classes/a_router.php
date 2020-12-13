<?php
class A_Router {

  public $raw_obj = array();
  public $resources = [];
  public $export_str = '';

  function __construct() {

  }

  public function get_resources() {
    global $db_client;
    $sql = "SELECT * FROM {$db_client->table_name}";
    $result = $db_client->query($sql);
    $result_arr = [];
    while ($row = mysqli_fetch_assoc($result)) {
      //print_r($row);
      $result_arr[] = $row;
    }
    $this->resources = $result_arr;
    return $result_arr;
  }

  public function delete_resources() {
    global $db_client;
    $sql = "DELETE FROM {$db_client->table_name}";
    $result = $db_client->query($sql);
    return $result;
  }

  public function post_resources($obj) {
    global $db_client;
    $post_results = [];
    $errs = [];
    $this->raw_obj = json_decode($obj);
    foreach($this->raw_obj as $row) {
      $row_obj = new A_Post($row);
      $this->resources[] = $row_obj;
    }
    $format = $this->delete_resources();
    if ($format) {
      $valid_posts = 0;
      foreach ($this->resources as $resource) {
        $post_result = $resource->new_post();
        if ($post_result) {
          $post_results[] = $post_result;
        } else {
          $errs[] = $post_result;
        }
      }
      if (count($errs)) {
        echo ' - changes saved with error(s): ' .  strval(count($errs));

      }
    } else {
      echo ' - something went wrong ; database overwrite error';
    }
    return $this->resources;
  }

  public function rest_route($obj,$act) {

    switch($act) {
      case 'post' :
      case 'POST' :
        $this->post_resources($obj);
        break;
      case 'get' :
      case 'GET' :
        $this->get_resources();
        break;
      default :
        echo " - We're not set up for that REST op yet, Bernard.";
    }
    return $this->resources;
  }

}
?>
