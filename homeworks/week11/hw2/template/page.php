<!--  分頁  -->
<?php 
  $sql = 
    "SELECT COUNT(id) AS count FROM ahwei777_articles WHERE is_deleted = 0";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $count = $row['count'];
  $total_page = ceil($count / $items_per_page); //  ceil 無條件進位
?>

<div class = 'article page_info'>
  <span>總共有 <?php echo $count ?> 篇文章</span><br><br>
  <span>目前頁數：<?php echo $page ?> / <?php echo $total_page ?></span><br>
  <div class = 'paginator'>
    <?php if ($page != 1) { ?>
      <a href = 'articles_all.php?page=1'>首頁</a>
      <a href = 'articles_all.php?page=<?php echo $page - 1 ?>'>上一頁</a>
    <?php } ?>
    <?php if ($page != $total_page) { ?>
      <a href = 'articles_all.php?page=<?php echo $page + 1 ?>'>下一頁</a>
      <a href = 'articles_all.php?page=<?php echo $total_page ?>'>最後一頁</a>
    <?php } ?>
  </div>
  <a class = 'btn_gotop' href = "#">返回頂端</a>
</div>
