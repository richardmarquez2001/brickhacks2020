// CREATE APP PROPERTIES
app = {
  map: undefined,
  markers: [],
  csrf: '4#yr..~%hN%o17oJ-jg%"$-)W#V1%Z2XLZzd6z8maI^mA]*]2t.FyklY8(!KM',
  token: undefined,
  reporting: false
}

report = {
  crime: undefined,
  longitude: undefined,
  latitude: undefined,
}
// CREATES THE MAP FUNCTION
function initMap() {
  // FIRST LOCATION
  var start = {lat: 43.6532, lng: -79.3832};
  // The map, centered at Uluru

  app.map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',

              stylers: [{visibility:'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              stylers: [{visibility:'off'}]
            },
            {
              featureType: 'transit.station',
              stylers: [{visibility:'off'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ], center: start, disableDefaultUI: true}
    );
  app.map.setOptions({ minZoom: 5, maxZoom: 25 });

  google.maps.event.addListener(app.map, "click", function (event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      moveToLocation(latitude, longitude)
      if(app.reporting){
        report.longitude = longitude;
        report.latitude = latitude;
        closeMenu(report_text)
        openMenu(report_menu)
      }
      console.log( latitude + ', ' + longitude, app.token );
  }); //end addListener
  createCrime(start);
};

function moveToLocation(lat, lng){
  const center = new google.maps.LatLng(lat, lng);
  // using global variable:
  app.map.panTo(center);
}

function removeAll(){
    for (var i = 0; i < app.markers.length; i++ ) {
      app.markers[i].setMap(null);
    }
    app.markers.length = 0;
}

function placeAll(){
  axios({
      method: 'get',
      url: 'https://safetybook.herokuapp.com/crimes',
      timeout: 4000,
    }).then((res)=>{
      for(marker of res.data){
        createCrime({lng:marker.longitude, lat:marker.latitude}, marker.crime)
      }

    }).catch((err)=>{})
}

placeAll()

// CREATE CRIME MARKER FUNCTION, position = {lat: x, lng: y};
function createCrime(position,text){
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
    }
  });
  var string = '<p id="topic" class="firstHeading">'+text+'</p>'
  var infowindow = new google.maps.InfoWindow({
    content: string
  });
  marker.addListener('mouseover', function() {
    infowindow.open(app.map, marker);
  });
  marker.addListener('mouseout', function() {
    infowindow.close(app.map, marker);
  });
  app.markers.push(marker);
}

// REQUEST LONG AND lat
function submitReport(){
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBpmyoKedBUoX6w6iuXGdikk-vw3Jlb0cA'
  fetch(url).then(data=>{console.log(data)})
}

const login_form = document.getElementById("login-form");
const register_form = document.getElementById("register-form");
const report_form = document.getElementById('report-form');
const report_text = document.getElementById('choose');
const report_menu = document.getElementById("report-menu");
const login_menu = document.getElementById("login-menu");
const logged_in = document.getElementById('logged');

report_menu.style.display = "none";
login_menu.style.display = "none";

function openMenu(menu) {menu.style.display = "block";}
function closeMenu(menu) {menu.style.display = "none";}

function tryReport() {
  if (app.token == undefined){
    openMenu(login_menu);
  } else {
    openMenu(report_text);
    app.reporting = true;
  }
}

// POST
function tryPost(){
  //Add listener
  var object = {};
  object.longitude = report.longitude;
  object.latitude = report.latitude;
  object.crime = document.getElementById('crimedesc').value;
  axios({
      method: 'post',
      url: 'https://safetybook.herokuapp.com/crimes',
      timeout: 4000,
      data:object
    }).then((res)=>{
      closeMenu(report_menu)
      app.reporting = false;
      removeAll();
      placeAll();
    }).catch((err)=>{})
}

// LOGIN
async function tryLogin(){
  var object = {};
  object['csrf_key'] = '4#yr..~%hN%o17oJ-jg%"$-)W#V1%Z2XLZzd6z8maI^mA]*]2t.FyklY8(!KM'
  var elem = login_form.elements
  for(var i=0; i<elem.length; i++){
    object[elem[i].name]=elem[i].value;
  };
  //fetch('https://safetybook.herokuapp.com/users/login', {
  axios({
      method: 'post',
      url: 'https://safetybook.herokuapp.com/users/login',
      timeout: 4000,
      data:object
    }).then((res)=>{
      app.token = res.data;
      closeMenu(login_menu)
      openMenu(logged_in);
    }).catch((err)=>{})
}

// REGISTER
async function tryRegister(){
  var object = {};
  object['csrf_key'] = '4#yr..~%hN%o17oJ-jg%"$-)W#V1%Z2XLZzd6z8maI^mA]*]2t.FyklY8(!KM'
  var elem = register_form.elements
  for(var i=0; i<elem.length; i++){
    object[elem[i].name]=elem[i].value;
  };
  if(object.password1!=object.password2){
    console.log("PASSWORDS NOT THE SAME")
  } object2 = {phone:object.phone, password:object.password1};
  object2.csrf_key = object.csrf_key
  //fetch('', {
console.log(object2)
  axios({
      method: 'post',
      url: 'https://safetybook.herokuapp.com/users/register',
      timeout: 4000,
      data:object2
    }).then((res)=>{
      app.token = res.data;
      closeMenu(login_menu)
      openMenu(logged_in);

    }).catch((err)=>{})
}

module.exports = app
