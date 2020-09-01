<?php
  //  引入初始化檔案
  include_once('./start.php');

  $sql = "SELECT 
          A.id AS id, A.title AS title, A.categories_id AS categories_id, A.created_at AS created_at, C.categories_name AS categories_name, C.categories_color AS categories_color
          FROM ahwei777_articles AS A 
          LEFT JOIN ahwei777_articles_categories AS C ON A.categories_id = C.categories_id
          WHERE A.is_deleted = 0
          ORDER BY A.categories_id";
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

    <?php 
    while ($row = $result->fetch_assoc()) {
      $now_id = $row['categories_id'];
      if ($now_id !== $before_id) {
        echo "<div class = 'categories_header " . $row['categories_color'] . " '> " . escape($row['categories_name']) . "</div>";
      }
    ?>

    <div class = 'articles_bycategories'>
      <div><?php echo escape($row['title']) ?></div>
      <div class = 'articles_bycategories_info'>
        <span><?php echo escape($row['created_at']) ?></span>
          <a href = "articles_bysingle.php?article_id=<?php echo($row['id']) ?>">瀏覽</a>
      </div>
    </div>

    <?php $before_id = $now_id; } ?>

  </div>

</section>
</body>
</html>