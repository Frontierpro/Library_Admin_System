var response;
var dealer;

function Page_Initial() {
    var url = "./Card.php";
    response = Get_Http();
    response.onreadystatechange = Get_Info;
    response.open("GET", url, true);
    response.send(null);
}

function Get_Info() {
    if (response.readyState == 4 || response.readyState == "complete") {
        var info = response.responseText;
        var pos = 1;
        info = info.split('|');
        document.getElementById("department").options.length = 0;
        document.getElementById("department").options.add(new Option("", ""));
        while (pos <= info[0]) {
            document.getElementById("department").options.add(new Option(info[pos], info[pos]));
            pos++;
        }
        dealer = info[pos];
        pos++;
        document.getElementById("user").innerHTML = info[pos];
        document.getElementById("operation").options.length = 0;
        if (info[pos + 1] == "1")
            document.getElementById("operation").options.add(new Option("query", "search"));
        if (info[pos + 2] == "1")
            document.getElementById("operation").options.add(new Option("insert", "borrow"));
        if (info[pos + 3] == "1")
            document.getElementById("operation").options.add(new Option("remove", "return"));
        Borrow_Renew();
        Return_Renew();
        Button_Press();
    }
}

function Get_Http() {
    var request = null;
    try {
        request = new XMLHttpRequest();
    }
    catch (e) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return request;
}

function Button_Press() {
    var para;

    para = document.getElementById("cno").value + '|';
    para = para + document.getElementById("name").value + '|';
    para = para + document.getElementById("department").value + '|';
    para = para + document.getElementById("type").value + '|';
    para = para + document.getElementById("bno").value + '|';
    para = para + document.getElementById("borrow_year").value + '|';
    para = para + document.getElementById("borrow_month").value + '|';
    para = para + document.getElementById("borrow_day").value + '|';
    para = para + document.getElementById("return_year").value + '|';
    para = para + document.getElementById("return_month").value + '|';
    para = para + document.getElementById("return_day").value + '|';
    para = para + document.getElementById("order").value + '|';
    para = para + document.getElementById("operation").value + '|';
    para = para + dealer;
    document.getElementById("framework").contentWindow.Para_Accept(para);
}

function Borrow_Renew() {
    var bomonth = document.getElementById("borrow_month").value;
    var count;

    document.getElementById("borrow_day").options.length = 0;
    if (Number(bomonth) <= 7 && Number(bomonth) % 2 || Number(bomonth) >= 8 && Number(bomonth) % 2 == 0) {
        count = 1;
        while (count <= 31) {
            document.getElementById("borrow_day").options.add(new Option(count.toString(), count.toString()));
            count++;
        }
    }
    else if (Number(bomonth) != 2) {
        count = 1;
        while (count <= 30) {
            document.getElementById("borrow_day").options.add(new Option(count.toString(), count.toString()));
            count++;
        }
    }
    else if (Number(document.getElementById("borrow_year").value) % 4 == 0) {
        count = 1;
        while (count <= 29) {
            document.getElementById("borrow_day").options.add(new Option(count.toString(), count.toString()));
            count++;
        }
    }
    else {
        count = 1;
        while (count <= 28) {
            document.getElementById("borrow_day").options.add(new Option(count.toString(), count.toString()));
            count++;
        }
    }
}

function Return_Renew() {
    var remonth = document.getElementById("return_month").value;
    var count;

    document.getElementById("return_day").options.length = 0;
    if (Number(remonth) <= 7 && Number(remonth) % 2 || Number(remonth) >= 8 && Number(remonth) % 2 == 0) {
        count = 31;
        while (count >= 1) {
            document.getElementById("return_day").options.add(new Option(count.toString(), count.toString()));
            count--;
        }
    }
    else if (Number(remonth) != 2) {
        count = 30;
        while (count >= 1) {
            document.getElementById("return_day").options.add(new Option(count.toString(), count.toString()));
            count--;
        }
    }
    else if (Number(document.getElementById("return_year").value) % 4 == 0) {
        count = 29;
        while (count >= 1) {
            document.getElementById("return_day").options.add(new Option(count.toString(), count.toString()));
            count--;
        }
    }
    else {
        count = 28;
        while (count >= 1) {
            document.getElementById("return_day").options.add(new Option(count.toString(), count.toString()));
            count--;
        }
    }
}
