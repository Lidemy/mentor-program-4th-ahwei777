<?php
  //  初始化
  require_once('start.php');
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>登入</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./normalize.css">
</head>

<body>
  <!--  頂端警告句、導覽列、歡迎句  -->
  <?php include_once('./template/header.php') ?>

  <section class = "wrapper">
    <h1 class = 'title'>登入</h1>
    <!--  登入錯誤返回顯示訊息  -->
    <?php
      if (!empty($_GET['errCode'])) {
        $errCode = $_GET['errCode'];
        if ($errCode == 2) {
          echo "<div class = 'warning'>查無此帳號!</div>";
        } else if ($errCode == 3){
          echo "<div class = 'warning'>密碼輸入錯誤!</div>";
        }
      }
    ?>
    <!--  結束  -->
    <form class = "form_register check" method = "POST" action = "./handle/handle_login.php">
      <div>帳號：<input class = "input-check" type = "text" name = "username" placeholder='請輸入帳號' /></div>
      <div>密碼：<input class = "input-check" type = "password" name = "password" placeholder='請輸入密碼' /></div>
      <input class = "submit btn-scale" type = "submit" value = "送出"/>
    </form>

  </section>
  <!--  前端檢查空值並限制輸入格式  -->
  <script>
    const form = document.querySelector('.check');
    form.addEventListener('submit', (e) => {
      const textareas = document.querySelectorAll('.input-check');
      for (const textarea of textareas) {
        if (textarea.value == "") {
          e.preventDefault();
          alert('資料填寫不全！');
          return;
        }
        /*
        if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(textarea.value))) {
          e.preventDefault();
          alert('限輸入中文/英文/數字/底線!，以防有人想做壞壞的事~');
          return;
        }
        */
      }
    })
  </script>
</body>
</html>