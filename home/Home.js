var load, unload;
var info;

function Page_Initial() {
    var url = "./Home.php" + "?order=" + "true" + "&ip=" + Math.random();
    load = Get_Http();
    load.onreadystatechange = Get_Info;
    load.open("GET", url, true);
    load.send(null);
}

function Get_Info() {
    if (load.readyState == 4 || load.readyState == "complete") {
        info = load.responseText;
        info = info.split('|');
        if (info[1] == "") {
            document.getElementById("book_url").href = "../index/Index.html";
            document.getElementById("card_url").href = "../index/Index.html";
            return;
        }
        Display_Refresh();
    }
}

function Button_Press() {
    var url = "./Home.php" + "?order=" + "false" + "&ip=" + Math.random();
    unload = Get_Http();
    unload.onreadystatechange = Set_Info;
    unload.open("GET", url, true);
    unload.send(null);
}

function Set_Info() {
    if (unload.readyState == 4 || unload.readyState == "complete")
        window.location.href = "../index/Index.html";
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

function Book_Over(flag) {
    if (flag) {
        document.getElementById("book_url").style.color = "#ff8c00";
        document.getElementById("book").style.borderColor = "#ff8c00";
    }
    else {
        document.getElementById("book_url").style.color = "#373737";
        document.getElementById("book").style.borderColor = "#ffffff";
    }
}

function Card_Over(flag) {
    if (flag) {
        document.getElementById("card_url").style.color = "#ffa500";
        document.getElementById("card").style.borderColor = "#ffa500";
    }
    else {
        document.getElementById("card_url").style.color = "#373737";
        document.getElementById("card").style.borderColor = "#ffffff";
    }
}

function Display_Refresh() {
    document.getElementById("caption").innerHTML = "Hi, " + info[1];
    if (info[2] == 1)
        document.getElementById("book_note").rows[0].cells[0].innerHTML = "select √";
    else
        document.getElementById("book_note").rows[0].cells[0].innerHTML = "select ×";
    if (info[3] == 1)
        document.getElementById("book_note").rows[0].cells[1].innerHTML = "insert √";
    else
        document.getElementById("book_note").rows[0].cells[1].innerHTML = "insert ×";
    if (info[4] == 1)
        document.getElementById("book_note").rows[0].cells[2].innerHTML = "remove √";
    else
        document.getElementById("book_note").rows[0].cells[2].innerHTML = "remove ×";
    if (info[5] == 1)
        document.getElementById("card_note").rows[0].cells[0].innerHTML = "search √";
    else
        document.getElementById("card_note").rows[0].cells[0].innerHTML = "search ×";
    if (info[6] == 1)
        document.getElementById("card_note").rows[0].cells[1].innerHTML = "borrow √";
    else
        document.getElementById("card_note").rows[0].cells[1].innerHTML = "borrow ×";
    if (info[7] == 1)
        document.getElementById("card_note").rows[0].cells[2].innerHTML = "return √";
    else
        document.getElementById("card_note").rows[0].cells[2].innerHTML = "return ×";
}
