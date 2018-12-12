var xhttp = new XMLHttpRequest();
var json;
var coordinates = []
var map, heatmap;
var loadedFlag = false;


function loadDoc() {
  loadedFlag = false;
  console.log("cleared array");
  console.log(hours1);
  console.log(hours2);
  coordinates = [];
  console.log("hi");
  xhttp.onload = function() {
    console.log("Calling callback");
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("post").innerHTML = this.responseText;
      json = JSON.parse(this.responseText);
            console.log(json);
      json.forEach(function(object) {
         //sliced the necessary parts of object.time (string) and put them into variables
         var hour = object.time.slice(-8, -6);
         var minute = object.time.slice(-5, -3);
         
        
        //what needs to be added below here is an if statement saying that as long as hour is between hours1 and hours2 (hours1 and hours2 are found in rangeSlider.js and they represent the hours the user has chosen on the slider) and the same for minute, then you can do the below
        //console.log("hour " + hour);
       // console.log("hours1" + hours1);
        //console.log("hours2" +hours2);
        
        
        hour = hour - 6;
        if(hour <= 0) {
          hour += 24;
          console.log("neg");
        }
        
        if (hours1 != hours2 && minutes1 != minutes2) {
        if (hours1 != hours2 && hour >= hours1 && hour <= hours2) {
            coordinates.push(new google.maps.LatLng(object.latitude,object.longitude));

		    console.log("wasda");
			
		  } else if(hours1 == hours2 && minute >= minutes1 && minute <= minutes2) {
		     coordinates.push(new google.maps.LatLng(object.latitude,object.longitude));
		     		    console.log("wasda");

		  }
        }
 
	
      });
    }
    loadedFlag = true;
    initMap();
    
  };
  
  xhttp.open("POST", "api.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("user=root&pass=password&db=mydatabase&table=location&action=get");
}

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
        console.log("Starting get points, state " + loadedFlag);
        //loadDoc();
                console.log("after load doc, state " + loadedFlag);


         //sleep(2000);

        console.log("??");
        console.log(coordinates);
        return coordinates;
      }
      
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

