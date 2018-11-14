
      var map, heatmap;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 13,
          center: {lat: 37.775, lng: -122.434},
          mapTypeId: 'satellite'
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });
      }
      // Heatmap data: 500 Points
      function getPoints() {
        return [
            for (var key in xhttp) {
                if (xhttp.hasOwnProperty(key)) {
                    new google.maps.LatLng(xhttp[key].latitude, xhttp[key].longitude)
                }
            }
        ];
      }