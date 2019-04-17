<?php
    $cno = $_GET["cno"];
    $name = $_GET["name"];
    $department = $_GET["department"];
    $type = $_GET["type"];
    $bno = $_GET["bno"];
    $borrow_date = $_GET["borrow_date"];
    $return_date = $_GET["return_date"];
    $order = $_GET["order"];
    $operation = $_GET["operation"];
    $admin = $_GET["admin"];

    $connect = new mysqli("localhost", "root", "", "library");
    if ($operation == "search") {
        $flag = 1;
        $sql = "select * from card natural join borrow";
        if ($cno != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." cno = '".$cno."'";
        }
        if ($name != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." name = '".$name."'";
        }
        if ($department != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." department = '".$department."'";
        }
        if ($type != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." type = '".$type."'";
        }
        if ($bno != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." bno = '".$bno."'";
        }
        if ($borrow_date != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." borrow_date >= '".$borrow_date."'";
        }
        if ($return_date != "") {
            if ($flag) {
                $sql = $sql." where";
                $flag = 0;
            }
            else
                $sql = $sql." and";
            $sql = $sql." return_date <= '".$return_date."'";
        }
        if ($order == "borrow_up")
            $sql = $sql." order by borrow_date asc";
        else if ($order == "borrow_down")
            $sql = $sql." order by borrow_date desc";
        else if ($order == "return_up")
            $sql = $sql." order by return_date asc";
        else
            $sql = $sql." order by return_date desc";
        $sql = $sql.";";
        $result = $connect->query($sql);
        echo $result->num_rows;
        if ($result->num_rows > 0)
            while ($row = $result->fetch_assoc()) {
                echo "|";
                echo "card number--".$row["cno"];
                echo "|";
                echo "name--".$row["name"];
                echo "|";
                echo "department--".$row["department"];
                echo "|";
                echo "type--".$row["type"];
                echo "|";
                echo "book number--".$row["bno"];
                echo "|";
                echo "admin--".$row["admin_id"];
                echo "|";
                echo "borrow date--".substr($row["borrow_date"], 0, 10);
                echo "|";
                echo "return date--".substr($row["return_date"], 0, 10);
            }
    }
    else if ($operation == "borrow") {
        $sqli = "select * from card natural left join borrow where";
        $sqli = $sqli." cno = '".$cno."' and";
        $sqli = $sqli." name = '".$name."' and";
        $sqli = $sqli." department = '".$department."' and";
        $sqli = $sqli." type = '".$type."';";
        $resulti = $connect->query($sqli);
        if ($bno == "") {
            if ($resulti->num_rows > 0)
                echo "insert false";
            else {
                $sqlii = "insert into card values ";
                $sqlii = $sqlii."('".$cno."', ";
                $sqlii = $sqlii."'".$name."', ";
                $sqlii = $sqlii."'".$department."', ";
                $sqlii = $sqlii."'".$type."');";
                $resultii = $connect->query($sqlii);
                if ($resultii)
                    echo "insert true";
                else
                    echo "insert fail";
            }
        }
        else {
            if ($resulti->num_rows == 0)
                echo "no card";
            else {
                $sqliii = "select stock from book where bno = '".$bno."';";
                $resultiii = $connect->query($sqliii);
                $rowiii = $resultiii->fetch_assoc();
                if ($resultiii->num_rows > 0) {
                    if ($rowiii["stock"] > 0) {
                        $judge = 0;
                        while ($rowi = $resulti->fetch_assoc())
                            if ($rowi["bno"] == $bno) {
                                $judge = 1;
                                echo "borrow false";
                                break;
                            }
                        if ($judge == 0) {
                            $sqliv = "update book set stock = stock - 1 where bno = '".$bno."';";
                            $resultiv = $connect->query($sqliv);
                            $sqlv = "insert into borrow values ";
                            $sqlv = $sqlv."('".$bno."', ";
                            $sqlv = $sqlv."'".$cno."', ";
                            $sqlv = $sqlv."'".$borrow_date."', ";
                            $sqlv = $sqlv."'".$return_date."', ";
                            $sqlv = $sqlv."'".$admin."');";
                            $resultv = $connect->query($sqlv);
                            if ($resultv)
                                echo "borrow true";
                            else
                                echo "borrow fail";
                        }
                    }
                    else {
                        echo "|no stock";
                        $sqlvi = "select min(return_date) as return_date from borrow where bno = '".$bno."';";
                        $resultvi = $connect->query($sqlvi);
                        $rowvi = $resultvi->fetch_assoc();
                        echo $rowvi["return_date"];
                    }
                }
                else
                    echo "no book";
            }
        }
    }
    else {
        $sqlvii = "select * from card natural left join borrow where";
        $sqlvii = $sqlvii." cno = '".$cno."' and";
        $sqlvii = $sqlvii." name = '".$name."' and";
        $sqlvii = $sqlvii." department = '".$department."' and";
        $sqlvii = $sqlvii." type = '".$type."' and";
        $sqlvii = $sqlvii." bno = '".$bno."' and";
        $sqlvii = $sqlvii." borrow_date = '".$borrow_date."' and";
        $sqlvii = $sqlvii." return_date = '".$return_date."';";
        $resultvii = $connect->query($sqlvii);
        if ($resultvii->num_rows > 0) {
            $sqlviii = "update book set stock = stock + 1 where bno = '".$bno."';";
            $resultviii = $connect->query($sqlviii);
            $sqlix = "delete from borrow where cno = '".$cno."' and bno = '".$bno."';";
            $resultix = $connect->query($sqlix);
            if ($resultix)
                echo "return true";
            else
                echo "return fail";
        }
        else
            echo "return false";
    }
    $connect->close();
?>
