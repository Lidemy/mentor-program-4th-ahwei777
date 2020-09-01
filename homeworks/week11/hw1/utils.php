<?php
  function getDataFromUsername($username) {
    global $conn;
    $sql = 
    "SELECT 
    U.nickname AS nickname, A.role_id AS role_id, A.role_name AS role_name, A.enter_admin AS enter_admin, A.add_comment AS add_comment, A.delete_self AS delete_self, A.delete_all AS delete_all, A.update_self AS update_self, A.update_all AS update_all
    FROM ahwei777_users AS U 
    LEFT JOIN ahwei777_authority AS A on A.role_id = U.role_id 
    WHERE U.username = ?
    ORDER BY A.role_id ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function echoCorrectIfTrue($type){
    if ($type) {
      echo "√";
    }
  }

  function addClassIfSelected($page) {
    $uri = $_SERVER['REQUEST_URI'];
    if (strpos($uri, $page) !== false) {
      echo "class = 'active'";
    }
  }

?>