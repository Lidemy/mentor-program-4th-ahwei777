<?php
  //  引入初始化檔案
  include_once('./start.php');
  
  $errcode = null;
  if (!empty($errcode)) {
    $errcode = $_GET['errcode'];
  }
?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>登入</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>

<section>
  <div class = "login_block">
    <div class = "warning">
      <?php 
      if ($errcode == 1) {
        echo "帳號輸入錯誤!";
      } else if ($errcode == 2) {
        echo "密碼輸入錯誤!";
      }
      ?>
    </div>
    <form method = "POST" action = "./handle/handle_login.php">
      <div>帳號： <input class = "require" type = "text" name = "username" placeholder = "請輸入帳號" /></div>
      <div>密碼： <input class = "require" type = "password" name = "password" placeholder = "請輸入密碼" /></div>
      <input class = "btn_submit" type = "submit"/>
    </form>
  </div>
</section>

</body>

<script>

  document.querySelector('form').addEventListener('submit', (e) => {
    const inputs = document.querySelectorAll('.require');
    for (const input of inputs) {
      if (input.value == "") {
        e.preventDefault();
        alert('資料輸入不全!');
        return;
      }
    }
  })

</script>

</html>