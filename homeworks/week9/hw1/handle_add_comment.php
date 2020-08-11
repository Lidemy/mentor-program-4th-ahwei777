<?php
  //  引入登入檔
  require_once('conn.php');
  //  抓取使用者名稱
  session_start();
  $username = $_SESSION['username'];

  $content = $_POST["content"];

  //  空值處理
  if (empty($content)) {
    header("Location: index.php?errCode=1");
  }
  
  //  寫入資料庫
  $sql = sprintf("INSERT INTO ahwei777_comments(username, content) VALUES('%s', '%s')", $username, $content);
  $result = $conn->query($sql);

  if ($result) {
    //  寫入成功導回首頁
    header("Location: index.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }


?>