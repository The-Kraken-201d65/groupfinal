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

function retrieveLocationsFromStorage() {
  // gets Location object list from storage
  // iterates over list to instantiate Location objects into Location.locationsArray
  var stringyLocations = localStorage.getItem('locationsArray');
  var unlabeledLocations = JSON.parse(stringyLocations);
  for (var i = 0; i < unlabeledLocations.length; i++) {
    new Location(unlabeledLocations[i].name, unlabeledLocations[i].src);
  }
}




