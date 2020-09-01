<?php
  //  引入初始化檔案
  include_once('./start.php');

  $article_id = $_GET['article_id'];

  $sql = "SELECT 
          A.id AS id, A.title AS title, A.content AS content, A.categories_id AS categories_id, A.created_at AS created_at, C.categories_name AS categories_name, C.categories_color AS categories_color
          FROM ahwei777_articles AS A 
          LEFT JOIN ahwei777_articles_categories AS C ON A.categories_id = C.categories_id
          WHERE A.id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $article_id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  if ($result->num_rows == 0) {
    die('此文章不存在或已被刪除!');
  }

  $row = $result->fetch_assoc();

?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title><?php echo escape($row['title']) ?></title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<section>
  <div class = "main_wrapper">

    <div class = "article">
      <div class = "article_header">
        <h1 class = "article_header-title"><?php echo escape($row['title']) ?></h1>
      </div>
      <div class = "article_info">
        <span><?php echo escape($row['created_at']) ?></span>
        <span class = "categories <?php echo escape($row['categories_color'])?>"><?php echo escape($row['categories_name']) ?></span>
      </div>
      <div class = "article_content"><?php echo $row['content'] ?></div>
    </div>

  </div>
</section>

</body>
</html>