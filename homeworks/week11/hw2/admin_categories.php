<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $sql = "SELECT * FROM ahwei777_articles_categories";
  $result = $conn->query($sql);

  if (!$result) {
    die($conn->error);
  }

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>管理分類</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<section>
<?php 
  $sql_categories = "SELECT * FROM ahwei777_articles_categories";
  $result_categories = $conn->query($sql_categories);
?>
  <div class = "article">
      <table>
      <tr>
        <th>分類名稱</th>
        <th>分類顏色</th>
        <th>更新</th>
      </tr>
      <?php while ($row = $result->fetch_assoc()) { ?>
      <tr>
        <form method = "POST" action = "./handle/handle_update_categories.php">
          <td>
            <input type = "text" name = "categories_name" value = "<?php echo $row['categories_name']; ?>"/>
          </td>
          <td>
            <label>
              <input type = "radio" name = "categories_color" value = "red" <?php if ($row['categories_color'] == "red") {echo "checked";} ?>/>
              <span class = "red" >紅色</span>
            </label>
            <label>
              <input type = "radio" name = "categories_color" value = "blue" <?php if ($row['categories_color'] == "blue") {echo "checked";} ?>/>
              <span class = "blue" >藍色</span>
            </label>
            <label>
              <input type = "radio" name = "categories_color" value = "green" <?php if ($row['categories_color'] == "green") {echo "checked";} ?>/>
              <span class = "green" >綠色</span>
            </label>
          </td>
          <td>
            <input type = "hidden" name = "categories_id" value = "<?php echo $row['categories_id']; ?>">
            <input type = "submit" value = "確定">
          </td>
        </form>
      </tr>
      <?php } ?>

      <tr class = "row_add_categories">
        <form method = "POST" action = "./handle/handle_add_categories.php">
          <td>
            <input type = "text" name = "categories_name" placeholder = "請輸入新分類名稱"/>
          </td>
          <td>
            <label>
              <input type = "radio" name = "categories_color" value = "red" >
              <span class = "red" >紅色</span>
            </label>
            <label>
              <input type = "radio" name = "categories_color" value = "blue" >
              <span class = "blue" >藍色</span>
            </label>
            <label>
              <input type = "radio" name = "categories_color" value = "green" >
              <span class = "green" >綠色</span>
            </label>
          </td>
          <td>
            <input type = "submit" value = "確定">
          </td>
        </form>
      </tr>
    </table>
  </div>

</section>

</body>

<script>

</script>

</html>