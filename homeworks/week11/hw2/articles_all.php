<?php
  //  引入初始化檔案
  include_once('./start.php');

  //  分頁功能
  $page = 1;
  //  點擊換頁時會帶上參數，更新當前頁面
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page-1) * $items_per_page;

  $sql = "SELECT 
          A.id AS id, A.title AS title, A.content AS content, A.categories_id AS categories_id, A.created_at AS created_at, C.categories_name AS categories_name, C.categories_color AS categories_color
          FROM ahwei777_articles AS A 
          LEFT JOIN ahwei777_articles_categories AS C ON A.categories_id = C.categories_id
          WHERE A.is_deleted = 0
          ORDER BY A.created_at DESC
          LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  $result = $stmt->get_result();

?>


<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name = "viewport" content = "width=device-width, initial-scale=1">
  <title>文章列表</title>
  <link rel = "stylesheet" href = "normalize.css">
  <link rel = "stylesheet" href = "style.css">
</head>

<body>
<!-- nav -->
<?php include_once('./template/nav.php') ?>
<!-- banner -->
<?php include_once('./template/banner.php') ?>

<section>
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class = "article">
        <div class = "article_header">
          <h1 class = "article_header-title"><?php echo escape($row['title']) ?></h1>
        </div>
        <div class = "article_info">
          <span><?php echo escape($row['created_at']) ?></span>
          <span class = "categories <?php echo escape($row['categories_color'])?>"><?php echo escape($row['categories_name']) ?></span>
        </div>
        <div class = "article_content overflow"><?php echo substr(($row['content']), 0, 100) ?></div>
        <a class = "article_more" href = "articles_bysingle.php?article_id=<?php echo($row['id']) ?>">READ MORE</a>
      </div>
    <?php } ?>

    <!--  分頁  -->
    <?php include_once('./template/page.php') ?>

</section>

</body>
</html>