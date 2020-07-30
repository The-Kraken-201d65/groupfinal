'user strict';


//for dark mode
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_dark_mode
var darkModeLocations= localStorage.getItem('dark-mode');
if (darkModeLocations === null){
  var darkMode = false;

}
else{
  var darkMode = JSON.parse(darkModeLocations);
  if (darkMode === true){
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
}