<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin:*');
  
  //  空值處理
  if (empty($_POST['site_key']) || 
      empty($_POST['nickname']) || 
      empty($_POST['content'])
  ) {
    $json = array(
      "ok" => false,
      "message" => 'Please input missing fields'
    );
    $response = json_encode($json, JSON_PRETTY_PRINT);
    echo $response;
    die();
  }

  //  輸入資料庫
  $site_key = $_POST['site_key'];
  $nickname= $_POST['nickname'];
  $content= $_POST['content'];
  $sql = "INSERT INTO ahwei777_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();
  //  錯誤處理
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
  } else {
    $json = array(
      "ok" => true,
      "comments" => "success!",
      "last_comment" => array(
        "nickname" => $nickname,
        "content" => $content
      )
    );
  }
  $response = json_encode($json, JSON_PRETTY_PRINT);
  echo $response;
?>