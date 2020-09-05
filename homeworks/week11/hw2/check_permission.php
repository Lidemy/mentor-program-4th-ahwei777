<?php
  //  非登入狀態警告
  if (empty($_SESSION['username'])) {
    die('您沒有權限，請登入後再繼續');
  }

?>

