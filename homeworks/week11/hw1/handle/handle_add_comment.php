<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('./../start.php');
  
  if(!$add_comment) {
    die('你沒有留言的權限!');
  }

  //  取出表單資料
  $content = $_POST["content"];

  //  寫入資料庫
  $sql = "INSERT INTO ahwei777_comments(username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();

  if ($result) {
    //  寫入成功導回首頁
    header("Location: ./../index.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }

?>