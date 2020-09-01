<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $article_id = $_GET['article_id'];

  $sql = "UPDATE ahwei777_articles SET is_deleted = 1 WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $article_id);
  $result = $stmt->execute();

  
  if ($result) {
    header("Location: ./../admin_articles.php");
  } else {
    echo "Failed: " . $conn->error;
  }

?>