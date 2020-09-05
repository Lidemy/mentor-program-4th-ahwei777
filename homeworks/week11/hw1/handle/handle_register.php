<?php
  //  初始化
  require_once('./../start.php');

  //  提取資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role_id = $_POST['role_id'];
  
  //  開始進行資料庫動作
  $sql = "INSERT INTO ahwei777_users(nickname, username, password, role_id) values(?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssi", $nickname, $username, $password, $role_id);
  $result = $stmt->execute();
  
  //  錯誤處理
  if (!$result) {
    $code = $conn->errno;
    //  "1062" 欄位值重複
    if ($code === 1062) {
      header("Location: ./../register.php?errCode=3");
    }
    die($conn->error);
  }

  //  註冊成功設為登入狀態：建立 PHPSESSID
  $_SESSION['username'] = $username;
  header("Location: ./../index.php");
?>