// CREATE APP PROPERTIES
app = {
  map: undefined,
  markers: undefined
}


// CREATES THE MAP FUNCTION
function initMap() {
  // FIRST LOCATION
  var start = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  app.map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: start, disableDefaultUI: true}
    );

  createCrime(start);
  console.log(markers)
}


// CREATE CRIME MARKER FUNCTION, position = {lat: x, lng: y};
function createCrime(position){
  // CREATE NEW CRIME MARKER
  var marker = new google.maps.Marker({
    position: position,
    map: app.map,
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#d45542',
        fillOpacity: 0.6,
        strokeColor: '#7d3429',
        strokeOpacity: 0.9,
        strokeWeight: 1,
        scale: 7
    }});
  app.push(marker);
}
