<?php
  //  初始化
  require_once('./../start.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM ahwei777_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  //  錯誤排除，執行成功時 result = 1
  if (!$result) {
    die($conn->error);
  }

  //  將查詢結果取回
  $result = $stmt->get_result();

  //  資料中未找到此 username ，回傳錯誤代碼(查無此帳號)
  if ($result->num_rows == 0) {
    header("Location: ./../login.php?errCode=2");
    exit();
  }

  //  資料庫有找到此 username→將查詢結果取出
  $row = $result->fetch_assoc();
  //  驗證使用者輸入的 password 是否符合資料庫內 hash 後的結果
  if (password_verify($password, $row['password'])) {
    //  驗證成功，建立 PHPSESSID 以保持登入狀態
    $_SESSION['username'] = $username;
    header("Location: ./../index.php");
  //  密碼驗證失敗，回傳錯誤代碼(密碼錯誤)
  } else {
    header("Location: ./../login.php?errCode=3");
    exit();
  }
?>