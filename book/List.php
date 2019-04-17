<?php
    $bno = $_GET["bno"];
    $category = $_GET["category"];
    $title = $_GET["title"];
    $publication = $_GET["publication"];
    $author = $_GET["author"];
    $year = $_GET["year"];
    $price = $_GET["price"];
    $num = $_GET["num"];
    $year_start = $_GET["year_start"];
    $year_end = $_GET["year_end"];
    $price_start = $_GET["price_start"];
    $price_end = $_GET["price_end"];
    $order = $_GET["order"];
    $operation = $_GET["operation"];

    $connect = new mysqli("localhost", "root", "", "library");
    $flag = 1;
    $sql = "select * from book";
    if ($bno != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." bno = '".$bno."'";
    }
    if ($category != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." category = \"".$category."\"";
    }
    if ($title != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." title = '".$title."'";
    }
    if ($publication != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." press = '".$publication."'";
    }
    if ($author != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." author = '".$author."'";
    }
    if ($year != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." year = '".$year."'";
    }
    if ($price != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." price = '".$price."'";
    }
    if ($year_start != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." year >= ".$year_start;
    }
    if ($year_end != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." year <= ".$year_end;
    }
    if ($price_start != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." price >= ".$price_start;
    }
    if ($price_end != "") {
        if ($flag) {
            $sql = $sql." where";
            $flag = 0;
        }
        else
            $sql = $sql." and";
        $sql = $sql." price <= ".$price_end;
    }
    if ($order == "bno_up")
        $sql = $sql." order by bno asc";
    else if ($order == "bno_down")
        $sql = $sql." order by bno desc";
    else if ($order == "year_up")
        $sql = $sql." order by year asc";
    else if ($order == "year_down")
        $sql = $sql." order by year desc";
    else if ($order == "stock_up")
        $sql = $sql." order by stock asc";
    else if ($order == "stock_down")
        $sql = $sql." order by stock desc";
    else if ($order == "total_up")
        $sql = $sql." order by total asc";
    else if ($order == "total_down")
        $sql = $sql." order by total desc";
    else if ($order == "price_up")
        $sql = $sql." order by price asc";
    else
        $sql = $sql." order by price desc";
    $sql = $sql.";";
    $result = $connect->query($sql);
    if ($operation == "select") {
        echo $result->num_rows;
        if ($result->num_rows > 0)
            while ($row = $result->fetch_assoc()) {
                echo "|";
                echo "book number--".$row["bno"];
                echo "|";
                echo "title--".$row["title"];
                echo "|";
                echo "total--".$row["total"];
                echo "|";
                echo "stock--".$row["stock"];
                echo "|";
                echo "price--".$row["price"];
                echo "|";
                echo "category--".$row["category"];
                echo "|";
                echo "author--".$row["author"];
                echo "|";
                echo "press--".$row["press"];
                echo "|";
                echo "year--".$row["year"];
            }
    }
    else if ($operation == "insert") {
        $sqli = "select * from book where bno = '".$bno."'";
        $resulti = $connect->query($sqli);
        if ($resulti->num_rows > 0) {
            $rowi = $resulti->fetch_assoc();
            if ($result->num_rows > 0) {
                $total = $num + $rowi["total"];
                $stock = $num + $rowi["stock"];
                $sqlii = "update book set total = ".$total.", stock = ".$stock." where bno = '".$bno."';";
                $resultii = $connect->query($sqlii);
                if ($resultii)
                    echo "true";
                else
                    echo "fail";
            }
            else
                echo "false";
        }
        else {
            $sqliii = "insert into book values ";
            $sqliii = $sqliii."('".$bno."',";
            $sqliii = $sqliii."\"".$category."\",";
            $sqliii = $sqliii."'".$title."',";
            $sqliii = $sqliii."'".$publication."',";
            $sqliii = $sqliii.$year.",";
            $sqliii = $sqliii."'".$author."',";
            $sqliii = $sqliii.$price.",";
            $sqliii = $sqliii.$num.",";
            $sqliii = $sqliii.$num.");";
            $resultiii = $connect->query($sqliii);
            if ($resultiii)
                echo "true";
            else
                echo "fail";
        }
    }
    else {
        $sqliv = "select * from book where bno = '".$bno."'";
        $resultiv = $connect->query($sqliv);
        if ($result->num_rows > 0) {
            $rowiv = $resultiv->fetch_assoc();
            $totali = $rowiv["total"] - $num;
            $stocki = $rowiv["stock"] - $num;
            if ($stocki >= 0) {
                $sqlv = "update book set stock = ".$stocki.", total = ".$totali." where bno = '".$bno."';";
                $resultv = $connect->query($sqlv);
                if ($resultv)
                    if ($totali == 0) {
                        $sqlvi = "delete from book where bno = '".$bno."';";
                        $resultvi = $connect->query($sqlvi);
                        if ($resultvi)
                            echo "true";
                        else
                            echo "fail";
                    }
                else
                    echo "fail";
            }
            else
                echo "fail";
        }
        else
            echo "false";
    }
    $connect->close();
?>
