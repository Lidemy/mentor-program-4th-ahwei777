<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('start.php');

  //  取得此留言 ID
  $comment_id = $_GET['id'];
  
  //  提取資料庫所有留言，
  $sql = 
  "SELECT * FROM ahwei777_comments WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $comment_id);
  $result = $stmt->execute();

  //  執行失敗時錯誤處理
  if (!$result) {
    die('Error:' . $conn->error);
  }
  //  執行成功時 $result = 1，取出查詢結果
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

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
  <!--  頂端警告句、導覽列、歡迎句  -->
  <?php include_once('./template/header.php') ?>

  <div class = 'board_header'>
    <form class = 'form_comment' method = "POST" action = "./handle/handle_update_comment.php">
      <div class = "form_title">編輯留言</div>
      <!--  符合權限才顯示留言內容  -->
      <textarea  class = "input-comment" name = "content" rows = "5"><?php
        if (($row['username'] == $username) || $update_all) {echo $row['content'];} else {echo "不要偷看別人的留言喔~";}
        ?></textarea>
      <input type = "hidden" name = "id" value = "<?php echo $comment_id ?>"/>
      <!--  符合權限才顯示送出按鈕  -->
      <?php if (($row['username'] == $username) || $update_all ) { ?>
        <input class = "submit btn-scale" type = "submit" value = "送出"></input>
      <?php } ?>
      <!--  結束  -->
    </form>
  </div>
    
  <!--  前端檢查空值並限制輸入格式  -->
  <script>
    document.querySelector('.form_comment').addEventListener('submit', (e) => {
      if (document.querySelector('.input-comment').value == "") {
        e.preventDefault();
        alert('請輸入內容!')
      }
    })
  </script>
</body>
</html>