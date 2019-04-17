var flag = 1;
var response;

function Button_Press() {
	if (flag) {
		var user, keyword;
		var url = "./Index.php";
		user = document.getElementById("ID").value;
		keyword = document.getElementById("password").value;
		url = url + "?user=" + user + "&keyword=" + keyword + "&ip=" + Math.random();
		response = Get_Http();
		response.onreadystatechange = Get_Info;
		response.open("GET", url, true);
		response.send(null);
	}
}

function Get_Info() {
	if (response.readyState == 4 || response.readyState == "complete") {
		if (response.responseText == "id error")
			alert("This ID doesn't exists!");
		else if (response.responseText == "password error")
			alert("Password ERROR!");
		else
			window.location.href = "../home/Home.html";
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

function Character_Warning() {
	if (document.getElementById("ID").value.length > 15 && document.getElementById("password").value.length > 15) {
		document.getElementById("ID_note").innerHTML = "ID should be no more than 15 characters!";
		document.getElementById("password_note").innerHTML = "Password should be no more than 15 characters!";
		document.getElementById("field").style.height = "380px";
		flag = 0;
	}
	else if (document.getElementById("ID").value.length > 15 && document.getElementById("password").value.length <= 15) {
		document.getElementById("ID_note").innerHTML = "ID should be no more than 15 characters!";
		document.getElementById("password_note").innerHTML = "";
		document.getElementById("field").style.height = "360px";
		flag = 0;
	}
	else if (document.getElementById("ID").value.length <= 15 && document.getElementById("password").value.length > 15) {
		document.getElementById("ID_note").innerHTML = "";
		document.getElementById("password_note").innerHTML = "Password should be no more than 15 characters!";
		document.getElementById("field").style.height = "360px";
		flag = 0;
	}
	else {
		document.getElementById("ID_note").innerHTML = "";
		document.getElementById("password_note").innerHTML = "";
		document.getElementById("field").style.height = "340px";
		flag = 1;
	}
}

function Request_Reject() {
	alert("Please enter your ID and password!");
}
