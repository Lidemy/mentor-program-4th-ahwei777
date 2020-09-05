<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('start.php');
  
  //  判斷後台權限
  require_once('check_admin.php');

  //  提取目前所有身分及對應權限
  $sql = 
  "SELECT * FROM ahwei777_authority ORDER BY role_id ";
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
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./normalize.css">
</head>

<body>
  <!--  頂端警告句、導覽列、歡迎句  -->
  <?php include_once('./template/header.php') ?>

  <section class = "wrapper">
    <div class = "admin_wrapper">
      <table>
        <tr>
          <th>身分名稱(上限10個字)</th>
          <th>進入後台</th>
          <th>新增留言</th>
          <th>刪除自己留言</th>
          <th>刪除所有留言</th>
          <th>更新自己留言</th>
          <th>更新所有留言</th>
          <th>開放註冊</th>
          <th>更新</th>
        </tr>
      <!--  持續取出 $row 內的資料直到沒有為止  -->
      <?php while($row = $result->fetch_assoc()) { ?>
        <tr>
          <!--  更新權限表單  -->
          <form method = "POST" action = "./handle/handle_admin_update_authority.php">
            <td><input type = "text" name = 'role_name' maxlength = "10" value ="<?php echo escape($row['role_name']); ?>"/></td>
            <td><input type = "checkbox" name = 'enter_admin' value = '1' <?php if($row['enter_admin']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'add_comment' value = '1' <?php if($row['add_comment']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'delete_self' value = '1' <?php if($row['delete_self']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'delete_all' value = '1' <?php if($row['delete_all']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'update_self' value = '1' <?php if($row['update_self']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'update_all' value = '1' <?php if($row['update_all']) {echo "checked";} ?>/></td>
            <td><input type = "checkbox" name = 'registrable' value = '1' <?php if($row['registrable']) {echo "checked";} ?>/></td>
            <input type = 'hidden' name = 'role_id' value = '<?php echo escape($row['role_id']); ?>'/>
            <td><input type = "submit" value = "確定"/></td>
          </form>
        </tr>
      <?php } ?>
        <!--  更新權限表單  -->
        <tr class = "tr_add_authority">
          <form method = "POST" action = "./handle/handle_admin_add_authority.php">
            <td><input type = "text" placeholder = "新增身分" name = 'role_name' maxlength = "10"/></td>
            <td><input type = "checkbox" name = 'enter_admin' value = '1' /></td>
            <td><input type = "checkbox" name = 'add_comment' value = '1' /></td>
            <td><input type = "checkbox" name = 'delete_self' value = '1' /></td>
            <td><input type = "checkbox" name = 'delete_all' value = '1' /></td>
            <td><input type = "checkbox" name = 'update_self' value = '1' /></td>
            <td><input type = "checkbox" name = 'update_all' value = '1' /></td>
            <td><input type = "checkbox" name = 'registrable' value = '1' /></td>
            <td><input type = "submit" value = "確定"/></td>
          </form>
        </tr>
      </table>
    </div>
  </section>
  
  <script>
    // 前端檢查空值
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
      form.addEventListener('submit', (e) => {
        const input = form.parentNode.querySelector('input[type=text]')
        if (input.value == '') {
          e.preventDefault();
          alert('身分名稱不得為空！')
        }
      })
    }
  </script>
</body>
</html>