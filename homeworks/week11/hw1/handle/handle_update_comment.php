<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('./../start.php');

  $comment_id = $_POST['id'];
  $content = $_POST['content'];

  //  權限為可更新所有的留言
  if ($update_all) {
    $sql = "UPDATE ahwei777_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $comment_id);
    $result = $stmt->execute();
  } else if ($update_self) {
    //  權限為可更新自己留言，且此留言為此使用者所發布
    $sql = "UPDATE ahwei777_comments SET content = ? WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $comment_id, $username);
    $result = $stmt->execute();
    //print_r($conn);
    //echo $conn->affected_rows;
  } 
  
  //  指令執行成功時 $result = 1
  if ($result) {
    //  寫入成功導回首頁
    header("Location: ./../index.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }

?>