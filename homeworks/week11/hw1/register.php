<?php
  //  初始化
  require_once('start.php');

  //  取得目前開放申請的身分名單
  $sql = "SELECT * FROM ahwei777_authority WHERE registrable = 1 ORDER BY role_id";
  $result = $conn->query($sql);

  //  執行失敗時錯誤處理
  if (!$result) {
    die('Error:' . $conn->error);
  }
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>註冊</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./normalize.css">
</head>

<body>
  <!--  頂端警告句、導覽列、歡迎句  -->
  <?php include_once('./template/header.php') ?>

  <section class = "wrapper">
    <h1 class = 'title'>註冊</h1>
    <form class = "form_register check" method = "POST" action = "./handle/handle_register.php">
      <!--  依據錯誤代碼顯示提示訊息  -->
      <?php 
      if (!empty($_GET['errCode'])) {
        $errCode = $_GET['errCode'];
        if ($errCode == 3) {
          echo "<div class = 'warning'>此帳號已被使用!</div>";
        }
      }
      ?>
      
      <div>暱稱： <input class = 'input-check' type = "text" name = "nickname" placeholder='請輸入暱稱' /></div>
      <div>帳號： <input class = 'input-check' type = "text" name = "username" placeholder='請輸入帳號' /></div>
      <div>密碼： <input class = 'input-check' type = "password" name = "password" placeholder='請輸入密碼' /></div>
      <span>註冊身分： </span>
      <span>
        <?php while($row = $result->fetch_assoc()) { ?>
          <label><input type = "radio" name = "role_id" value = '<?php echo $row['role_id'] ?>'/><?php echo $row['role_name'] ?></label>
        <?php } ?>
      </span>
      <table>
        <caption>目前權限一覽</caption>
        <tr>
          <th>身分</th>
          <th>進入後台</th>
          <th>新增留言</th>
          <th>刪除自己留言</th>
          <th>刪除所有留言</th>
          <th>編輯自己留言</th>
          <th>編輯所有留言</th>
        </tr>
        <!--  重置 result  -->
        <?php $result->data_seek(0); ?>
        <?php while ($row = $result->fetch_assoc()) { ?>
        <tr class = 'tr_role'>
          <td><?php echo $row['role_name']; ?></td>
          <td><?php echoCorrectIfTrue($row['enter_admin']); ?></td>
          <td><?php echoCorrectIfTrue($row['add_comment']); ?></td>
          <td><?php echoCorrectIfTrue($row['delete_self']); ?></td>
          <td><?php echoCorrectIfTrue($row['delete_all']); ?></td>
          <td><?php echoCorrectIfTrue($row['update_self']); ?></td>
          <td><?php echoCorrectIfTrue($row['update_all']); ?></td>
        </tr>
        <?php } ?>

      </table>
      <div><input class = "submit btn-scale" type = "submit" value = "送出"/></div>
    </form>
  </section>

  <!--  前端檢查空值  -->
  <script>
    const form = document.querySelector('.check');
    form.addEventListener('submit', (e) => {
      const textareas = document.querySelectorAll('.input-check');
      for (const textarea of textareas) {
        if (textarea.value == "") {
          e.preventDefault();
          alert('註冊資料填寫不全！');
          return;
        }
      const radios = document.querySelectorAll('input[type=radio]');
      const radioIsValid = [...radios].some(radio => radio.checked);
      if (!radioIsValid) {
        e.preventDefault();
        alert('請至少勾選一項身分！');
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