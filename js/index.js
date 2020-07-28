'user strict';

Location.locationsArray = [];

//constructor
function Location(name, src) {

  this.name = name;
  this.src = src;
  this.hearted = false;
  this.thumbDown = false;
  Location.locationsArray.push(this);

}

Location.prototype.saveToLocalStorage = function() {
  // saves the current state of Location.locationsArray to local storage
  // to be retrieved in the profile
  var stringyLocations = JSON.stringify(Location.locationsArray);
  localStorage.setItem('locationsArray', stringyLocations);
};

//renders img to index.html
Location.prototype.renderLocations = function() {

  var target = document.getElementById('List-of-Images');
  var locationImg = document.createElement('img');
  locationImg.alt = this.name;
  locationImg.src = this.src;
  target.appendChild(locationImg);


};

function clickHeartOnImage(event) {

  var locationIndex = 0;
  // if(Location.locationsArray[locationIndex].src === event.target.getAttribute('src')){

  Location.locationsArray[locationIndex].hearted = true;

  // }

  var stringyLocationsArray = JSON.stringify(Location.locationsArray);
  localStorage.setItem('locations', stringyLocationsArray);

  displayLocationImage();

}



var locationArrayIndex = 0;

function displayLocationImage() {

  var currentImage = document.getElementById('List-of-Images');
  currentImage.innerHTML = '';
  Location.locationsArray[locationArrayIndex].renderLocations();
  locationArrayIndex++;


}


// ============================ function calls ============================

var listOfLocations = document.getElementById('hearted');
listOfLocations.addEventListener('click', clickHeartOnImage);

new Location('img1', 'images/kayangan-lake.jpg');
new Location('river', 'images/river-natl-park.jpg');
new Location('barracuda-lake', 'images/barracuda-lake.jpg');

displayLocationImage();

 
 
// feel free to move this line anywhere, just using for testing for now
Location.locationsArray[0].saveToLocalStorage();





