<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('./../start.php');
  
  //  判斷後台權限
  require_once('./../check_admin.php');

  //  接收表單資料
  $role_id = $_POST['role_id'];
  $role_name = $_POST['role_name'];

  //  判斷勾選與否
  $enter_admin = isset($_POST['enter_admin']) ? $_POST['enter_admin'] : 0;
  $add_comment = isset($_POST['add_comment']) ? $_POST['add_comment'] : 0;
  $delete_self = isset($_POST['delete_self']) ? $_POST['delete_self'] : 0;
  $delete_all = isset($_POST['delete_all']) ? $_POST['delete_all'] : 0;
  $update_self = isset($_POST['update_self']) ? $_POST['update_self'] : 0;
  $update_all = isset($_POST['update_all']) ? $_POST['update_all'] : 0;
  $registrable = isset($_POST['registrable']) ? $_POST['registrable'] : 0;

  $sql = 
    "UPDATE ahwei777_authority 
    SET role_name =?, enter_admin = ?, add_comment = ?, delete_self = ?, delete_all = ?, update_self = ?, update_all = ?, registrable = ? WHERE role_id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("siiiiiiii", $role_name, $enter_admin, $add_comment, $delete_self, $delete_all, $update_self, $update_all, $registrable, $role_id);
  $result = $stmt->execute();

  //  指令執行成功
  if ($result) {
    //  寫入成功導回首頁
    header("Location: ./../admin_authority.php");
  } else {
    //  未成功輸出錯誤訊息
    echo "Failed: " . $conn->error;
  }

?>