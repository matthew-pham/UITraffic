var xhttp = new XMLHttpRequest();
var json;
var coordinates = []
function loadDoc() {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("post").innerHTML = this.responseText;
      json = JSON.parse(this.responseText);
     json.forEach(function(object) {
         //sliced the necessary parts of object.time (string) and put them into variables
         var hour = object.time.slice(-8, -6);
         var minute = object.time.slice(-5, -3);
         
         //what needs to be added below here is an if statement saying that as long as hour is between hours1 and hours2 (hours1 and hours2 are found in rangeSlider.js and they represent the hours the user has chosen on the slider) and the same for minute, then you can do the below
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