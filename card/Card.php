<?php
    $connect = new mysqli("localhost", "root", "", "library");
    $sql = "select distinct department as department from card";
    $result = $connect->query($sql);
    echo $result->num_rows;
    echo '|';
    while ($row = $result->fetch_assoc()) {
        echo $row["department"];
        echo '|';
    }
    $sqli = "select * from admin where online = true";
    $resulti = $connect->query($sqli);
    $rowi = $resulti->fetch_assoc();
    echo $rowi["id"];
    echo '|';
    echo $rowi["name"];
    echo '|';
    echo $rowi["card_query"];
    echo '|';
    echo $rowi["card_borrow"];
    echo '|';
    echo $rowi["card_return"];
    $connect->close();
?>
