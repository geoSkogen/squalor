<?php
class A_Post {

  public $name = '';
  public $items = '';

  function __construct($json_row) {
    $this->name = $json_row->textspan;
    $this->items = json_encode($json_row->items);
  }

  public function new_post() {
    global $db_client;
    $sql = "INSERT INTO {$db_client->table_name} (textspan, items) VALUES ('$this->name','$this->items')";
    $result = $db_client->query($sql);
    return $result;
  }

}
?>
