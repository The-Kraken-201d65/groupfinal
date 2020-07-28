'user strict';

Location.locationsArray = [];

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

Location.prototype.renderLocations = function() {
  var target = document.getElementById('List-of-Images');
  var locationImg = document.createElement('img');
  locationImg.alt = this.name;
  locationImg.src = this.src;
  target.appendChild(locationImg);


};


new Location('img1', 'images/kayangan-lake.jpg');
new Location('river', 'images/river-natl-park.jpg');
new Location('barracuda-lake', 'images/barracuda-lake.jpg');

// console.log(Location.locationsArray[0]);

Location.locationsArray[1].renderLocations();





