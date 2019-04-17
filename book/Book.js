var response;

function Page_Initial() {
    document.getElementById("year_other").style.display = "none";
    document.getElementById("price_other").style.display = "none";
    document.getElementById("num_all").style.display = "none";
    var url = "./Book.php";
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
        document.getElementById("category").options.length = 0;
        document.getElementById("category").options.add(new Option("", ""));
        while (pos <= info[0]) {
            document.getElementById("category").options.add(new Option(info[pos], info[pos]));
            pos++;
        }
        document.getElementById("user").innerHTML = info[pos];
        document.getElementById("operation").options.length = 0;
        if (info[pos + 1] == "1")
            document.getElementById("operation").options.add(new Option("query", "select"));
        if (info[pos + 2] == "1")
            document.getElementById("operation").options.add(new Option("insert", "insert"));
        if (info[pos + 3] == "1")
            document.getElementById("operation").options.add(new Option("remove", "delete"));
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

    para = document.getElementById("bno").value + '|';
    para = para + document.getElementById("category").value + '|';
    para = para + document.getElementById("title").value + '|';
    para = para + document.getElementById("publication").value + '|';
    para = para + document.getElementById("author").value + '|';
    para = para + document.getElementById("year").value + '|';
    para = para + document.getElementById("price").value + '|';
    para = para + document.getElementById("num").value + '|';
    para = para + document.getElementById("year_start").value + '|';
    para = para + document.getElementById("year_end").value + '|';
    para = para + document.getElementById("price_start").value + '|';
    para = para + document.getElementById("price_end").value + '|';
    para = para + document.getElementById("order").value + '|';
    para = para + document.getElementById("operation").value;
    document.getElementById("framework").contentWindow.Para_Accept(para);
}

function Content_Renew() {
    if (document.getElementById("operation").value == "select") {
        document.getElementById("year_select").style.display = "block";
        document.getElementById("price_select").style.display = "block";
        document.getElementById("select_order").style.display = "block";
        document.getElementById("year_other").style.display = "none";
        document.getElementById("price_other").style.display = "none";
        document.getElementById("num_all").style.display = "none";
        document.getElementById("field").style.height = "480px";
    }
    else {
        document.getElementById("year_select").style.display = "none";
        document.getElementById("price_select").style.display = "none";
        document.getElementById("select_order").style.display = "none";
        document.getElementById("year_other").style.display = "block";
        document.getElementById("price_other").style.display = "block";
        document.getElementById("num_all").style.display = "block";
        document.getElementById("field").style.height = "410px";
    }
}
