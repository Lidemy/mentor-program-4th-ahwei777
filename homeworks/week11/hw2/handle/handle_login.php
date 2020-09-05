<?php
  require_once('./../conn.php');
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM ahwei777_articles_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  //  查無此帳號
  if ($result->num_rows == 0) {
    //  帳號輸入錯誤
    header('Location: login.php?errcode=1');
    exit();
  }

  $row = $result->fetch_assoc();
  if ($password == $row['password']) {
    //  輸入密碼等於資料庫中密碼>登入成功
    $_SESSION['username'] = $username;
    header("Location: ./../admin_articles.php");
  } else {
    header('Location: ./../login.php?errcode=2');
    exit();
  }

  
?>