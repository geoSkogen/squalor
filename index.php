<?php
include 'util/db_con.php';
include 'util/db_exec.php';
include 'classes/a_post.php';
include 'classes/a_router.php';

$db_con = new DB_Con($_SERVER['REQUEST_URI']);
$db_client = new DB_Exec();
$router = new A_Router();
$data = [];

if (!empty($_POST['api-json'])) {
  $router->rest_route($_POST['api-json'],'post');
}

$data = $router->rest_route('/','get');

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
    SQ&upsilon;&alpha;L 0-Я
  </title>
  <script id="json-api" type="application/ld+json"><?php print json_encode($data); ?></script>
  <link rel="stylesheet" href="style/stupidstyle.css"/>

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->
<!--<script>
  src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script>-->

</head>
<body>

  <div id="horiz">
    <input type="text" id="callresponse" class="main-text" />
    <button id="go" class="tidybutton">GO</button><br/>
    <button id="save" class="tidybutton">SAVE</button>
  </div>

  <div id="app"></div>

  <div id="api">
    <form style="display:none;" action="/index.php" method="POST">
      <input type="text" id="api-json" name="api-json" /><input type="submit" id="api-submit" />
    </form>
  </div>

</body>

<script src="lib/ux-api.js"></script>
<script src="lib/db-api.js"></script>

</html>

<?php
?>
