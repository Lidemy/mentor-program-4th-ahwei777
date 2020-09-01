
<nav>
  <div class = "nav_title">Ahwei Blog</div>
  <div class = "nav_btns">
    <div class = "nav_btns-function">
      <a href = "index.php" class = "<?php echoActiveIfSelected("index.php"); ?>">首頁</a>
      <a href = "articles_all.php" class = "<?php echoActiveIfSelected("articles_all.php"); ?>">文章列表</a>
      <a href = "articles_bycategories.php" class = "<?php echoActiveIfSelected("articles_bycategories.php"); ?>">文章分類</a>
      <a href = "aboutme.php" class = "<?php echoActiveIfSelected("aboutme.php"); ?>">關於我</a>
    </div>
    <div>
      <?php if (!empty($_SESSION['username'])) { ?>
        <a href = "add_article.php" class = "<?php echoActiveIfSelected("add_article.php"); ?>">新增文章</a>
        <a href = "admin_articles.php" class = "<?php echoActiveIfSelected("admin_articles.php"); ?>">管理文章</a>
        <a href = "admin_categories.php" class = "<?php echoActiveIfSelected("admin_categories.php"); ?>">管理分類</a>
        <a href = "./handle/handle_logout.php">登出</a>
      <?php } else { ?>
        <a href = "login.php" class = "<?php echoActiveIfSelected("login.php"); ?>">登入</a>
      <?php } ?>
    </div>
  </div>
</nav>