<?php
  require_once('conn.php');

  function getUserdataFromUsername($username) {
    global $conn;
    $sql = sprintf("SELECT * FROM ahwei777_users WHERE username = '%s'", $username);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

?>