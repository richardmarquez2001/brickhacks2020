const login_form = document.getElementById("login-form");
const register_form = document.getElementById("register-form");

const report_menu = document.getElementById("report-menu");
const login_menu = document.getElementById("login-menu");
const register_menu = document.getElementById("register-menu");

report_menu.style.display = "none";
login_menu.style.display = "none";

app = {
  csrf: '4#yr..~%hN%o17oJ-jg%"$-)W#V1%Z2XLZzd6z8maI^mA]*]2t.FyklY8(!KM',
  token: undefined
};

function openMenu(menu) {menu.style.display = "block";}
function closeMenu(menu) {menu.style.display = "none";}

function tryReport() {
  if (app.token == undefined){openMenu(login_menu);}
  else {openMenu(report_menu);}
}
// POST
async function tryPost(){
  var object = {};
  object['csrf_key'] = '4#yr..~%hN%o17oJ-jg%"$-)W#V1%Z2XLZzd6z8maI^mA]*]2t.FyklY8(!KM'
  object['token'] = app.token;
  for(var i=0; i<elem.length; i++){
    object[elem[i].name]=elem[i].value;
  };
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+object.address.replace(" ","+")+"&key=AIzaSyBpmyoKedBUoX6w6iuXGdikk-vw3Jlb0cA")
  axios({
      method: 'post',
      url: 'https://safetybook.herokuapp.com/crimes',
      timeout: 4000,
      data:object
    }).then((res)=>{
      console.log(res)
      closeMenu(report_menu)
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
    }).catch((err)=>{})
}
