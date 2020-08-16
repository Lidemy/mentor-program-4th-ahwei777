<?php
  //  登入資料庫
  require_once('conn.php');
  //  Session 初始化，登入成功後給予 PHPSESSID
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("SELECT * FROM ahwei777_users WHERE username = '%s' AND password = '%s'", $username, $password);
  $result = $conn->query($sql);

  //  錯誤排除
  if (!$result) {
    die($conn->error);
  }

  //  找到匹配帳號密碼→登入成功
  if ($result->num_rows) {
    //  一步驟建立 PHPSESSID 以保持登入狀態
    $_SESSION['username'] = $username;
    header("Location: index.php");
  //  沒找到匹配資料，輸入資料有誤，以 GET 回傳錯誤代碼
  } else {
    header("Location: login.php?errCode=2");
  }
?>