<?php
    $connect = new mysqli("localhost", "root", "", "library");
    $sql = "select distinct category as category from book";
    $result = $connect->query($sql);
    echo $result->num_rows;
    echo '|';
    while ($row = $result->fetch_assoc()) {
        echo $row["category"];
        echo '|';
    }
    $sqli = "select name, book_search, book_insert, book_remove from admin where online = true";
    $resulti = $connect->query($sqli);
    $rowi = $resulti->fetch_assoc();
    echo $rowi["name"];
    echo '|';
    echo $rowi["book_search"];
    echo '|';
    echo $rowi["book_insert"];
    echo '|';
    echo $rowi["book_remove"];
    $connect->close();
?>
