<?php
  //  登入資料庫 & SESSION
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  //  先給定 null 避免報錯
  $username = null;
  $nickname = null;
  $enter_admin = null;
  $add_comment = null;
  $delete_self = null;
  $delete_all = null;
  $update_self = null;
  $update_all = null;

  //  登入後取出目前使用者對應身分的所有權限
  if (!empty($_SESSION['username'])) {
    echo $username;
    $username = $_SESSION['username'];
    $userData = getDataFromUsername($username);
    $nickname = $userData['nickname'];
    $enter_admin = $userData['enter_admin'];
    $add_comment = $userData['add_comment'];
    $delete_self = $userData['delete_self'];
    $delete_all = $userData['delete_all'];
    $update_self = $userData['update_self'];
    $update_all = $userData['update_all'];
  }

  //  登入後取出目前使用者對應身分的所有權限
  


?>