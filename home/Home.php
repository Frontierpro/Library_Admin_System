<?php
    $order = $_GET["order"];

    $connect = new mysqli("localhost", "root", "", "library");
    if ($order == "true") {
        $sql = "select id, name, book_search, book_insert, book_remove, card_query, card_borrow, card_return from admin where online = true";
        $result = $connect->query($sql);
        $row = $result->fetch_assoc();
        echo $row["id"];
        echo "|";
        echo $row["name"];
        echo "|";
        echo $row["book_search"];
        echo "|";
        echo $row["book_insert"];
        echo "|";
        echo $row["book_remove"];
        echo "|";
        echo $row["card_query"];
        echo "|";
        echo $row["card_borrow"];
        echo "|";
        echo $row["card_return"];
    }
    else {
        $sqli = "update admin set online = false";
        $change = $connect->query($sqli);
        echo "";
    }
    $connect->close();
?>
