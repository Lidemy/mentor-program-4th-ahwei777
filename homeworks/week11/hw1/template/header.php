<header>
  <div class = "header_warning">注意！此為練習網站，註冊時請勿使用任何真實帳號密碼</div>
  <nav>
    <div class = 'nav-title'>Bored Board</div>
    <div class = 'nav-btns'>
      <!--  依照登入與否及身分調整 nav bar  -->
      <a <?php addClassIfSelected("index.php") ?> href = "index.php">首頁</a>
      <?php if ($enter_admin) { ?>
        <a <?php addClassIfSelected("admin_users.php") ?> href = "admin_users.php">管理使用者</a>
        <a <?php addClassIfSelected("admin_authority.php") ?> href = "admin_authority.php">管理權限</a>
      <?php } ?>
        <!--  登入狀態  -->
      <?php if ($username) { 
        //  位於首頁時才顯示編輯暱稱
        if (strpos($_SERVER['REQUEST_URI'], "index.php") !== false) {
      ?>
        <a class = 'btn-update-user'>編輯暱稱</a>
      <?php } ?>
        <a href = "./handle/handle_logout.php">登出</a>
        <!--  非登入狀態  -->
      <?php } else { ?>
        <a <?php addClassIfSelected("register.php") ?> href = "register.php">註冊</a>
        <a <?php addClassIfSelected("login.php") ?> href = "login.php">登入</a>
      <?php } ?>
      <!--  結束  -->
    </div>
  </nav>
    <!--  歡迎句  -->
    <marquee class="welcome_msg" direction="right" scrollamount="3" behavior="alternate">
      <!--  登入後顯示暱稱及身分  -->
      Hello! <?php echo $username ? "<span class = 'span_highlight'>" . escape($nickname) . "</span>" : "請註冊身分" ?> 
      <?php if ($username) {echo ", 您目前的身分為： <span class = 'span_highlight'>" . escape($username) . "</span>";} ?>
    </marquee>
</header>