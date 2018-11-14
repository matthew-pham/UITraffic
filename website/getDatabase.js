var xhttp = new XMLHttpRequest();

function loadDoc() {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("post").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "website/api.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("user=root&pass=password&db=mydatabase&table=location&action=get");
}