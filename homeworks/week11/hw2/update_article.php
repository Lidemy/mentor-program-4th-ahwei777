<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $article_id = $_GET['article_id'];

  $sql = "SELECT * FROM ahwei777_articles WHERE id = ? AND is_deleted = 0";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $article_id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($result->num_rows == 0){
    die('此文章不存在或已被刪除!');
  }

?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>編輯文章</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
  <script src="https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js"></script>
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<?php 
  $sql_categories = "SELECT * FROM ahwei777_articles_categories";
  $result_categories = $conn->query($sql_categories);
?>

<section>
  <div class = "article wrapper">
    <form method = "POST" action = "handle/handle_update_article.php">
      <div class = "form_add_article_title">標題：<input type = "text" name = "title" value = "<?php echo escape($row['title']) ?>"/></div>
      <div>選擇分類：
        <?php while($row_categories = $result_categories->fetch_assoc()) { ?>
          <label>
            <input type = "radio" name = "categories_id" value = "<?php echo $row_categories['categories_id'] ?>" <?php if ($row['categories_id'] == $row_categories['categories_id']) {echo "checked";} ?>/>
            <span class = "<?php echo $row_categories['categories_color'] ?>" >
              <?php echo $row_categories['categories_name'] ?>
            </span>
          </label>
        <?php } ?>
      </div>
      <textarea id = "editor" name = "content"><?php echo escape($row['content']) ?></textarea>
      <input type = "hidden" name = "id" value = "<?php echo escape($row['id']) ?>"/>
      <input class = "btn_add_article" type = "submit" value = "更新文章"/>
    </form>
  </div>
</section>

<script>
  ClassicEditor
    .create( document.querySelector( '#editor' ) )
    .then( editor => {
      console.log( editor );
    } )
    .catch( error => {
      console.error( error );
    } );

  document.querySelector("form").addEventListener("submit", (e) => {
  const inputs = document.querySelectorAll("input");
  let radioIsChecked = false;
  let textIsChecked = false;
  for (input of inputs) {
    if (input.type == "text" && input.value !== "") {
      textIsChecked = true;
    } else if (input.type == "radio" && input.checked) {
      radioIsChecked = true;
    }
  }
  if (!textIsChecked) {
    e.preventDefault();
    alert('標題及內容不得為空！');
  }
  else if (!radioIsChecked) {
    e.preventDefault();
    alert('請勾選一個分類！');
  }
})
</script>

</body>



</html>