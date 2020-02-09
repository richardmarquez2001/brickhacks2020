const report_button = document.getElementById("post-button");
const report_form = document.getElementById("input-form");
const close_button = document.getElementById("close-button");

const report_menu = document.getElementById("report-menu");
const login_menu = document.getElementById("login-menu");
const register_menu = document.getElementById("register-menu");

report_menu.style.display = "none";
//login_menu.style.display = "none";
register_menu.style.display = "none";
function openMenu(menu){
  menu.style.display = "block"
};

function closeMenu(menu){
  menu.style.display = "none"
};
