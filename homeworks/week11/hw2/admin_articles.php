<?php
  //  引入初始化檔案
  include_once('./start.php');
  //  判斷權限
  include_once('./check_permission.php');

  $sql = "SELECT 
          A.id AS id, A.title AS title, A.categories_id AS categories_id, A.created_at AS created_at, C.categories_name AS categories_name, C.categories_color AS categories_color
          FROM ahwei777_articles AS A 
          LEFT JOIN ahwei777_articles_categories AS C ON A.categories_id = C.categories_id
          WHERE A.is_deleted = 0
          ORDER BY A.created_at DESC";
  $result = $conn->query($sql);

  if (!$result) {
    die($conn->error);
  }

  $before_id = null;
?>


<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>Blog</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<section>
  <div class = "article">

    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class = 'articles_bycategories'>
        <div><?php echo escape($row['title']) ?></div>
        <div class = 'articles_bycategories_info'>
          <span class = "categories <?php echo escape($row['categories_color'])?>"><?php echo escape($row['categories_name']) ?></span>
          <span><?php echo escape($row['created_at']) ?></span>
            <a href = "articles_bysingle.php?article_id=<?php echo escape($row['id']) ?>">瀏覽</a>
            <a href = "update_article.php?article_id=<?php echo escape($row['id']) ?>">編輯</a>
            <a href = "./handle/handle_delete.php?article_id=<?php echo escape($row['id']) ?>">刪除</a>
        </div>
      </div>
    <?php } ?>

  </div>
</section>

</body>

<script>

</script>

</html>