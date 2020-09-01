<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $sql = "SELECT * FROM ahwei777_articles_categories";
  $result = $conn->query($sql);

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>新增文章</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
  <script src="https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js"></script>
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<section>
  <div class = "article">
    <form method = "POST" action = "./handle/handle_add_article.php">
      <div class = "form_add_article_title">標題：<input type = "text" name = "title" placeholder = "請輸入標題"/></div>
      <div>選擇分類：
        <?php while($row = $result->fetch_assoc()) { ?>
          <label>
            <input type = "radio" name = "categories_id" value = "<?php echo $row['categories_id'] ?>"/>
            <span class = "<?php echo $row['categories_color'] ?>"><?php echo $row['categories_name'] ?></span>
          </label>
        <?php } ?>
      </div>
      <textarea id = "editor" name = "content">This is some sample content.</textarea>
      <input class = "btn_add_article" type = "submit" value = "新增文章"/>
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