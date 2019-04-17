<?php
    $user = $_GET["user"];
    $keyword = $_GET["keyword"];
    $find = false;

    $connect = new mysqli("localhost", "root", "", "library");
    $sql = "select password, name from admin where id = '".$user."'";
    $result = $connect->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc())
            if ($row["password"] == $keyword) {
                $find = true;
                echo $row["name"];
                $sqli = "update admin set online = true where id = '".$user."'";
                $change = $connect->query($sqli);
                $sqlii = "update admin set online = false where id <> '".$user."'";
                $clear = $connect->query($sqlii);
            }
        if (!$find)
            echo "password error";
    }
    else
        echo "id error";
    $connect->close();
?>
