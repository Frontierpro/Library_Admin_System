var response;
var opcommand;

function Para_Accept(para) {
    var url = "./List.php";
    para = para.split('|');
    opcommand = para[13];
    if (opcommand != "select") {
        var pos = 0;
        var judge = 0;
        while (pos < 8) {
            if (para[pos] == "") {
                judge = 1;
                break;
            }
            pos++;
        }
        if (judge == 1) {
            alert("Book info incomplete!");
            return;
        }
    }
    url = url + "?bno=" + para[0].replace('&', "%26");
    url = url + "&category=" + para[1].replace('&', "%26");
    url = url + "&title=" + para[2].replace('&', "%26");
    url = url + "&publication=" + para[3].replace('&', "%26");
    url = url + "&author=" + para[4].replace('&', "%26");
    url = url + "&year=" + para[5].replace('&', "%26");
    url = url + "&price=" + para[6].replace('&', "%26");
    url = url + "&num=" + para[7].replace('&', "%26");
    url = url + "&year_start=" + para[8].replace('&', "%26");
    url = url + "&year_end=" + para[9].replace('&', "%26");
    url = url + "&price_start=" + para[10].replace('&', "%26");
    url = url + "&price_end=" + para[11].replace('&', "%26");
    url = url + "&order=" + para[12].replace('&', "%26");
    url = url + "&operation=" + para[13].replace('&', "%26");
    url = url + "&ip=" + Math.random();
    response = Get_Http();
    response.onreadystatechange = Get_Info;
    response.open("GET", url, true);
    response.send(null);
}

function Get_Info() {
    var pos = 1, table = 1, row, col;
    var info;

    if (response.readyState == 4 || response.readyState == "complete") {
        info = response.responseText;
        if (opcommand == "select") {
            info = info.split('|');
            while ((table <= info[0]) && (table <= 50)) {
                row = Math.floor((pos - 9 * (table - 1)) / 6);
                col = pos - 9 * (table - 1) - 5 * row - 1;
                document.getElementById("book_" + table.toString()).style.display = "block";
                document.getElementById("book_" + table.toString()).childNodes[1].rows[row].cells[col].innerHTML = info[pos];
                if (pos % 9 == 0)
                    table++;
                pos++;
            }
            while (table <= 50) {
                document.getElementById("book_" + table.toString()).style.display = "none";
                table++;
            }
            if (info[0] <= 50)
                document.getElementById("summary").childNodes[1].innerHTML = info[0].toString() + " results exist in total.";
            else
                document.getElementById("summary").childNodes[1].innerHTML = "50+ results exist in total.";
        }
        else if (opcommand == "insert") {
            if (info == "true")
                alert("Insert successfully!");
            else if (info == "false")
                alert("Book info error!");
            else
                alert("Insert fail!");
        }
        else {
            if (info == "true")
                alert("Remove successfully!");
            else if (info == "false")
                alert("Book info error!");
            else
                alert("Remove fail!");
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
    var divtag = document.getElementById("book_1");
    var divcopy;

    while (count <= 51) {
        divcopy = divtag.cloneNode(true);
        divcopy.setAttribute("id", "book_" + count.toString());
        divtag.parentNode.appendChild(divcopy);
        count++;
    }
    document.getElementById("book_51").style.color = "#373737";
    document.getElementById("book_51").style.borderColor = "#373737";
    document.getElementById("book_51").style.display = "block";
}
