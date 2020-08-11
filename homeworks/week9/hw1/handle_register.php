<?php
  //  登入資料庫
  require_once('conn.php');
  session_start();

  //  提取資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  //  開始進行資料庫動作
  $sql = sprintf("INSERT INTO ahwei777_users(nickname, username, password) value('%s', '%s', '%s')", $nickname, $username, $password);
  $result = $conn->query($sql);
  
  //  錯誤處理
  if (!$result) {
    $code = $conn->errno;
    //  "1062" 欄位值重複
    if ($code === 1062) {
      header("Location: register.php?errCode=3");
    }
    die($conn->error);
  }

  //  註冊成功設為登入狀態：建立 PHPSESSID
  $_SESSION['username'] = $username;
  header("Location: index.php");
?>