<?php
  //  初始化
  require_once('./../start.php');
  
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  //  寫入資料庫
  $sql = "UPDATE ahwei777_users SET nickname = ? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if ($result) {
    //  寫入成功導回首頁
    header("Location: ./../index.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }

?>