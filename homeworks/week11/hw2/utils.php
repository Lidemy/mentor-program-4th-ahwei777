<?php
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getAtributeFromCategories_id($categories_id) {
    $sql = "SELECT * FROM ahwei777_articles_categories";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  function echoActiveIfSelected($page) {
    $uri = $_SERVER['REQUEST_URI'];
    if (strpos($uri, $page) !== false) {
      echo "active";
    }
  }
  

?>