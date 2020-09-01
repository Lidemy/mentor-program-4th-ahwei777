<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  $categories_id = $_POST['categories_id'];

  $sql = "UPDATE ahwei777_articles SET title = ?, content = ?, categories_id = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssii', $title, $content, $categories_id, $id);
  $result = $stmt->execute();

  //  指令執行成功
  if ($result) {
    //  執行成功導回首頁(沒刪到也是執行成功)
    header("Location: ./../admin_articles.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }
  
?>
