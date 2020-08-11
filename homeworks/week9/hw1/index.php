<?php
  //  登入資料庫
  require_once('conn.php');
  require_once('utils.php');

  session_start();

  //  檢查當下是否為登入狀態
  $username = null;
  $userData = null;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $userData = getUserdataFromUsername($username);
  }

  //  提取資料庫所有留言
  $sql = "SELECT * FROM ahwei777_comments ORDER BY created_at DESC";
  $result = $conn->query($sql);
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <header>
  <marquee class="header" direction="right" scrollamount="3" behavior="alternate">注意！此為練習網站，註冊時請勿使用任何真實帳號密碼</marquee>
  </header>
  <nav>
    <div class = 'nav-title'>Bored Board</div>
    <div class = 'nav-btns'>
      <!--  依照登入狀態調整 nav bar  -->
      <?php if (!$username) { ?>
        <a href = "register.php">註冊</a>
        <a href = "login.php">登入</a>
      <?php } else { ?>
        <a href = "handle_logout.php">登出</a>
      <?php } ?>
      <!--  結束  -->
    </div>
  </nav>
  <section class = "wrapper">
    <div class = board_header>
      <?php if ($username) { ?>
      <!--  歡迎句  -->
      <div class = "welcome-msg">Hello! <?php echo $userData['nickname'] ?></div>
      <?php } ?>
      <form class = 'form_comment check' method = "POST" action = "handle_add_comment.php">
        <textarea  class = "input-check" name = "content" rows = "5" placeholder='今晚，我想來點...'></textarea>
        <!--  依照登入狀態顯示留言送出按鈕  -->
        <?php if (!$username) { ?>
          <h2>請登入後發布留言</h2>
        <?php } else { ?>
          <input class = "submit btn-scale" type = "submit" value = "送出"></input>
        <?php } ?>
        <!--  結束  -->
      </form>
    </div>
    <div class = "comments">
      <!--  持續取出 $row 內的資料直到沒有為止  -->
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class = "comment">
          <div class = "comment_avatar"></div>
          <div class = "comment_info">
            <div>
              @(<span class = "comment_info-username"><?php echo $row['username'] ?></span>)
              <span class = "comment_info-time"><?php echo $row['created_at'] ?></span>
            </div>
            <div class = "comment-text"><?php echo $row['content'] ?></div>
          </div>
      </div>
      <?php } ?>
      <!--  結束  -->
    </div>
    <a class = 'btn-gotop' href = "#">返回頂端</a>
  </section>
  <!--  前端檢查空值並限制輸入格式  -->
  <script>
    const form = document.querySelector('.check');
    form.addEventListener('submit', (e) => {
      const textareas = document.querySelectorAll('.input-check');
      for (const textarea of textareas) {
        if (textarea.value == "") {
          e.preventDefault();
          alert('請輸入文字唷！');
          return;
        }
        if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(textarea.value))) {
          e.preventDefault();
          alert('限輸入中文/英文/數字/底線!，以防有人想做壞壞的事~');
          return;
        }
      }
    })
  </script>
</body>
</html>