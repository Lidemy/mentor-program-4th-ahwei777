<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin:*');

  //  判斷指定參數是否有傳進來
  if (empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => 'Please add site_key in url'
    );
    $response = json_encode($json, JSON_PRETTY_PRINT);
    echo $response; 
    die();
  }

  //  到資料庫查詢對應資料
  $site_key = $_GET['site_key'];
  $sql = 
  "SELECT * FROM ahwei777_discussions WHERE site_key = ? AND is_deleted = 0 " . 
  //  有帶 before 時調整 query 指令
  (isset($_GET['before']) ? " AND id < ? " : "") . 
  "ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);

  //  根據是否有帶 before 調整參數
  if (isset($_GET['before'])) {
    $stmt->bind_param('si', $site_key, $_GET['before']);
  } else {
    $stmt->bind_param('s', $site_key);
  }
  $result = $stmt->execute();

  //  執行失敗處理 ($result=0)
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json, JSON_PRETTY_PRINT);
    echo $response;
    die();
  }

  $result = $stmt->get_result();

  //  執行成功但資料庫沒資料時
  if ($result->num_rows === 0) {
    $json = array(
      "ok" => false,
      "message" => "No comments yet!"
    );
    $response = json_encode($json, JSON_PRETTY_PRINT);
    echo $response;
    die();
  }
  
  //  取得最舊一筆留言的 ID
  $sql_last = "SELECT min(id) FROM ahwei777_discussions";
  $result_last= $conn->query($sql_last);
  $row_last = $result_last->fetch_assoc();
  $last_id = $row_last['min(id)'];

  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push( $comments, array(
      'id' => $row['id'],
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at'=> $row['created_at'],
      //  回傳給前端可即時知道目前收到留言是否為最後一筆
      'is_last' => $row['id'] == $last_id,
    ));
  };
  //  設計 response 物件格式
  $json = array(
    "ok" => true,
    "comments" => $comments
  );
  //  將 response 物件轉為 JSON 格式
  $response = json_encode($json, JSON_PRETTY_PRINT);
  echo $response;
?>