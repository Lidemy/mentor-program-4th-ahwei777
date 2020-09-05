<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('start.php');
  
  //  分頁功能
  $page = 1;
  //  點擊換頁時會帶上參數，更新當前頁面
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page-1) * $items_per_page;

  //  提取資料庫所有留言
  $sql = 
    "SELECT " . 
    "C.id AS id, C.content AS content, C.created_at AS created_at, U.nickname AS nickname, U.username AS username " . 
    "FROM ahwei777_comments AS C " . 
    "LEFT JOIN ahwei777_users AS U on C.username = U.username " . 
    "WHERE C.is_deleted = 0 " . 
    "ORDER BY C.id DESC " . 
    "LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();

  //  執行失敗時錯誤處理
  if (!$result) {
    die('Error:' . $conn->error);
  }
  //  執行成功時 $result = 1，再取出查詢結果
  $result = $stmt->get_result();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./normalize.css">
</head>

<body>
  <!--  頂端警告句、導覽列、歡迎句  -->
  <?php include_once('./template/header.php') ?>

  <section class = "wrapper">
    <div class = 'board_header'>
    
      <!--  登入後才顯示修改暱稱  -->
      <?php if ($username) { ?>
      <form class = 'form_update-user hide' method = 'POST' action = "./handle/handle_update_nickname.php">
        <span>新的暱稱：<input class = "input_update-user" type = "text" name = "nickname" placeholder='請輸入' /></span>
        <input class = "submit_update-user" type = "submit" value = "確定"/>
      </form>
      <?php } ?>
      <!--  結束  -->

      <form class = 'form_comment' method = "POST" action = "./handle/handle_add_comment.php">
        <textarea  class = "input-comment" name = "content" rows = "5" maxlength="100" placeholder='響應節能減碳，上限一百字！'></textarea>
        <!--  依照登入狀態顯示留言送出按鈕  -->
        <?php if (!$username) { ?>
          <h2>請登入後發布留言</h2>
        <?php } else if ($add_comment) { ?>
          <input class = "submit" type = "submit" value = "送出"></input>
        <?php } else { ?>
          <h2>你沒有權限發布留言</h2>
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
              <span class = "comment_info-username"><?php echo escape($row['nickname']); ?></span>
              @(<span class = "comment_info-username"><?php echo escape($row['username']); ?></span>)
              <span class = "comment_info-time"><?php echo escape($row['created_at']); ?></span>
              <!--  判斷權限  -->
              <?php if ((($row['username'] == $username) && $update_self) || $update_all ) {?>
              <a href = "update_comment.php?id=<?php echo $row['id'] ?>">編輯</a>
              <?php } ?>
              <?php if ((($row['username'] == $username) && $delete_self) || $delete_all ) {?>
              <a href = "./handle/handle_delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a>
              <?php } ?>
            </div>
            <div class = "comment-text"><?php echo escape($row['content']); ?></div>
          </div>
        </div>
      <?php } ?>
      <!--  結束  -->
    </div>
    <br>
    <hr>
    
    <!--  分頁功能  -->
    <?php include_once('./template/page.php') ?>

    <a class = 'btn-gotop' href = "#">返回頂端</a>

  </section>
  
  <script>
    //  檢查 input 空值
    const form_comment = document.querySelector('.form_comment');
    form_comment.addEventListener('submit', (e) => {
      const textareas = document.querySelectorAll('.input-comment');
      for (const textarea of textareas) {
        if (textarea.value == "") {
          e.preventDefault();
          alert('請輸入文字唷！');
          return;
        }
      }
    })
    const form_updateUser = document.querySelector('.form_update-user');
    if (form_updateUser) {
      form_updateUser.addEventListener('submit', (e) => {
      const update_user = document.querySelector('.input_update-user');
      if (update_user.value == "") {
        e.preventDefault();
        alert('請輸入新的暱稱唷！');
        return;
      }
    })
    }
    //  更改暱稱功能
    const btn_updateUser = document.querySelector('.btn-update-user');
    if (btn_updateUser) {
      btn_updateUser.addEventListener('click', (e) => {
      document.querySelector('.form_update-user').classList.toggle('hide');
      })
    }
  </script>
</body>
</html>