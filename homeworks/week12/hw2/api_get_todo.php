<?php
require_once('conn.php');
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
//  空值處理
if (empty($_GET['id'])) {
  $json = array(
    'ok' => false,
    'message' => "Please add id in url"
  );
  $response = json_encode($json);
  echo $response;
  die();
}
//  提取資料庫
$id = $_GET['id'];
$sql = "SELECT id, todo FROM ahwei777_todos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
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
//  成功查詢資料庫，設計 response 物件格式
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$json = array(
  "ok" => true,
  "data" => array(
    "id" => $row['id'],
    "todo" => $row['todo']
  )
);
//  response 物件進行 json 編碼
$response = json_encode($json);
echo $response;

?>