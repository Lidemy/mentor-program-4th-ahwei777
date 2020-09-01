<?php
  //  初始化(登入資料庫, 啟用 SESSION, 判斷使用者登入與否及權限)
  require_once('start.php');
  
  //  判斷後台權限
  require_once('check_admin.php');

  //  提取資料庫所有使用者及對應身分
  $sql = 
    "SELECT 
    U.id AS id, U.nickname AS nickname, U.username AS username, U.created_at AS created_at, A.role_name AS role_name
    FROM ahwei777_users AS U
    LEFT JOIN ahwei777_authority AS A on A.role_id = U.role_id 
    ORDER BY U.id DESC";
  $result = $conn->query($sql);

  //  執行失敗時錯誤處理
  if (!$result) {
    die('Error:' . $conn->error);
  }

  //  提取所有身分名稱
  $result_roleList = $conn->query("SELECT role_name, role_id FROM ahwei777_authority");
  $roleList = array();
  while($row = $result_roleList->fetch_assoc()) {
    array_push($roleList, array(
      "role_id" => $row['role_id'],
      "role_name" => $row['role_name'],
    ));
  }
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>管理使用者</title>
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
          <th>#</th>
          <th>暱稱</th>
          <th>帳號</th>
          <th>建立時間</th>
          <th>目前身分</th>
          <th>編輯身分</th>
        </tr>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
          <td><?php echo escape($row['id']); ?></td>
          <td><?php echo escape($row['nickname']); ?></td>
          <td><?php echo escape($row['username']); ?></td>
          <td><?php echo escape($row['created_at']); ?></td>
          <td><?php echo escape($row['role_name']); ?></td>
          <td>
          <form class = 'form_update-role' method = 'POST' action = './handle/handle_update_role.php'>
            <!-- name 要加在 select 上後端才可以取得選定選項 -->
            <select name = 'role_id' >
              <option value = ''>請選擇</option>
              <?php foreach ($roleList as $value) {?>
                <option <?php if ($row['role_name'] == $value['role_name']) {echo "disabled style='background: lightgray;'";} ?> value='<?php echo $value['role_id']; ?>'>
                  <?php echo $value['role_name']; ?>
                </option>
              <?php } ?>
            </select>
            <input name = 'id' type = 'hidden' value = '<?php echo $row['id']; ?>'/>
            <input class = 'btn_update-role' type = 'submit' value = '確定'/>
            </form>
          </td>
        </tr>
      <?php } ?>
      </table> 
    </div>
  </section>

  <script>
  //  前端檢查空值並限制輸入格式
  document.querySelector('.admin_wrapper').addEventListener('submit', (e) => {
    console.log(e.target)
    if (e.target.firstElementChild.value == '') {
      e.preventDefault();
      alert('請選擇一項身分!')
    }
  })
  </script>
</body>
</html>