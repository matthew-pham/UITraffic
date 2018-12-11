var xhttp = new XMLHttpRequest();
var json;
var coordinates = []
function loadDoc() {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("post").innerHTML = this.responseText;
      json = JSON.parse(this.responseText);
     json.forEach(function(object) {
        coordinates.push(new google.maps.LatLng(object.latitude,object.longitude));
      });
      
    }
  };
  xhttp.open("POST", "api.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("user=root&pass=password&db=mydatabase&table=location&action=get");
}
      var map, heatmap;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 13,
          center: {lat: 40.116421, lng: -88.243385},
          mapTypeId: 'satellite'
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });
      }
      // Heatmap data: 500 Points
      function getPoints() {
        loadDoc();
        return coordinates;
      }