<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//  空值處理
if (empty($_POST['todo'])) {
  $json = array(
    'ok' => false,
    'message' => "Please input missing fields"
  );
  $response = json_encode($json);
  echo $response;
  die();
}
//  存取至資料庫
$todo = $_POST['todo'];
$sql = "INSERT INTO ahwei777_todos(todo) VALUES(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $todo);
$result = $stmt->execute();
//  錯誤處理
if (!$result) {
  $json = array(
    'ok' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}
//  成功完成新增，設計 response 物件格式
$json = array(
  "ok" => true,
  "message" => "Sucess!",
  'id' => $conn->insert_id
);
//  response 物件進行 json 編碼
$response = json_encode($json, JSON_PRETTY_PRINT);
echo $response;

?>