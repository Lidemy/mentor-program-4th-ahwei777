<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('./../start.php');

  //  取得表單資料
  $id = $_POST['id'];
  $role_id = $_POST['role_id'];

  //  執行 SQL 指令
  if ($enter_admin) {
    $sql = "UPDATE ahwei777_users SET role_id = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $role_id, $id);
    $result = $stmt->execute();
  } else {
    die('這裡不是你該來的地方~');
  }

  //  指令執行成功
  if ($result) {
    //  寫入成功導回首頁
    header("Location: ./../admin_users.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }
?>