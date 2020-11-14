<?php
include 'util/db_con.php';
if (!empty($_POST)) {
  echo 'squiggles';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>
  </title>

  <link rel="stylesheet" href="style/stupidstyle.css"/>

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->
<!--<script>
  src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script>-->

</head>
<body>

  <div id="horiz">
    <input type="text" id="callresponse" class="main-text"/>
    <button id="go" class="tidybutton">GO</button><br/>
    <button id="save" class="tidybutton">SAVE</button>
  </div>

  <div id="app"></div>

  <div id="api">
    <form style="display:none;" action="/index.php" method="POST">
      <input type="text" id="api-json" /><input type="submit" id="api-submit" />
    </form>
  </div>

</body>

<script src="lib/ux-api.js"></script>
<script src="lib/db-api.js"></script>

</html>

<?php
?>
