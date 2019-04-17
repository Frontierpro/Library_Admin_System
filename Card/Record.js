var response;
var opcommand;

function Para_Accept(para) {
    var url = "./Record.php";
    para = para.split('|');
    opcommand = para[12];
    if (opcommand != "search")
        if (para[0] == "" || para[1] == "" || para[2] == "" || para[3] == "") {
            alert("Card info incomplete!");
            return;
        }
    url = url + "?cno=" + para[0].replace('&', "%26");
    url = url + "&name=" + para[1].replace('&', "%26");
    url = url + "&department=" + para[2].replace('&', "%26");
    url = url + "&type=" + para[3].replace('&', "%26");
    url = url + "&bno=" + para[4].replace('&', "%26");
    url = url + "&borrow_date=" + (para[5] + "-" + para[6] + "-" + para[7]).replace('&', "%26");
    url = url + "&return_date=" + (para[8] + "-" + para[9] + "-" + para[10]).replace('&', "%26");
    url = url + "&order=" + para[11].replace('&', "%26");
    url = url + "&operation=" + para[12].replace('&', "%26");
    url = url + "&admin=" + para[13].replace('&', "%26");
    url = url + "&ip=" + Math.random();
    response = Get_Http();
    response.onreadystatechange = Get_Info;
    response.open("GET", url, true);
    response.send(null);
}

function Get_Info() {
    var pos = 1, table = 1, row, col;
    var info;
    var temp;

    if (response.readyState == 4 || response.readyState == "complete") {
        info = response.responseText;
        if (opcommand == "search") {
            info = info.split('|');
            while ((table <= info[0]) && (table <= 50)) {
                row = Math.floor((pos - 8 * (table - 1)) / 5);
                col = pos - 8 * (table - 1) - 4 * row - 1;
                document.getElementById("record_" + table.toString()).style.display = "block";
                document.getElementById("record_" + table.toString()).childNodes[1].rows[row].cells[col].innerHTML = info[pos];
                if (pos % 8 == 0)
                    table++;
                pos++;
            }
            while (table <= 50) {
                document.getElementById("record_" + table.toString()).style.display = "none";
                table++;
            }
            if (info[0] <= 50)
                document.getElementById("summary").childNodes[1].innerHTML = info[0].toString() + " results exist in total.";
            else
                document.getElementById("summary").childNodes[1].innerHTML = "50+ results exist in total.";
        }
        else if (opcommand == "borrow") {
            if (info[0] == '|')
                alert("This book has no stock, and nearest return time is " + info.substr(9, 10));
            else if (info == "insert true")
                alert("Card insert successfully!");
            else if (info == "insert false")
                alert("This card has been existed!");
            else if (info == "borrow true")
                alert("Record insert successfully!");
            else if (info == "borrow false")
                alert("This record has been existed!");
            else if (info == "no card")
                alert("No such card!");
            else if (info == "no book")
                alert("No such book!");
            else
                alert(info);
        }
        else {
            if (info == "return true")
                alert("Return successfully!");
            else if (info == "return false")
                alert("No such record!");
            else
                alert("Operation fail!");
        }
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

function Page_Initial() {
    var count = 2;
    var divtag = document.getElementById("record_1");
    var divcopy;

    while (count <= 51) {
        divcopy = divtag.cloneNode(true);
        divcopy.setAttribute("id", "record_" + count.toString());
        divtag.parentNode.appendChild(divcopy);
        count++;
    }
    document.getElementById("record_51").style.color = "#373737";
    document.getElementById("record_51").style.borderColor = "#373737";
    document.getElementById("record_51").style.display = "block";
}
