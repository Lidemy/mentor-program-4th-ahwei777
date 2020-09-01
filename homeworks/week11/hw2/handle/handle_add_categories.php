<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $categories_name = $_POST['categories_name'];
  $categories_color = $_POST['categories_color'];

  $sql = "INSERT INTO ahwei777_articles_categories(categories_name, categories_color) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $categories_name, $categories_color);
  $result = $stmt->execute();

  //  指令執行成功
  if ($result) {
    //  執行成功導回首頁(沒刪到也是執行成功)
    header("Location: ./../admin_categories.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }
  
?>
