// CREATE APP PROPERTIES
app = {
  map: undefined,
  markers: [],
}

// CREATES THE MAP FUNCTION
function initMap() {
  // FIRST LOCATION
  var start = {lat: 43.6532, lng: -79.3832};
  // The map, centered at Uluru
  app.map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: start, disableDefaultUI: true}
    );
  app.map.setOptions({ minZoom: 5, maxZoom: 25 });
  createCrime(start);

  console.log(markers)

}

// Gets the lang and longitude values based
function getCoord(){
    

}
// CREATE CRIME MARKER FUNCTION, position = {lat: x, lng: y};
function createCrime(position){
  // CREATE NEW CRIME MARKER
  var marker = new google.maps.Marker({
    position: position,
    map: app.map,
    label: 'test',
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#d45542',
        fillOpacity: 0.6,
        strokeColor: '#7d3429',
        strokeOpacity: 0.9,
        strokeWeight: 1,
        scale: 7
    }});
  app.markers.push(marker);
}

// REQUEST LONG AND lat
function submitReport(){
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBpmyoKedBUoX6w6iuXGdikk-vw3Jlb0cA'
  fetch(url).then(data=>{console.log(data)})
}
