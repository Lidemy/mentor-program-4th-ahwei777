<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('./../start.php');

  //  取得此留言 ID
  $comment_id = $_GET['id'];

  //  權限可刪除所有留言
  if ($delete_all) {
    $sql = "UPDATE ahwei777_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $comment_id);
    $result = $stmt->execute();
  } else if ($delete_self) {
    //  權限可刪除自己的留言，且此留言為此使用者發布
    $sql = "UPDATE ahwei777_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $comment_id, $username);
    $result = $stmt->execute();
  } 

  //  指令執行成功
  if ($result) {
    //  執行成功導回首頁(沒刪到也是執行成功)
    header("Location: ./../index.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }
?>