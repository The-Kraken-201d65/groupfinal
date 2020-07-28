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
//===============================

Location.prototype.displayHeartedImages = function(){
  console.log(Location.locationsArray);
  for (var i = 0; i < Location.locationsArray.length; i ++){
    if( Location.locationsArray[i].hearted === true){
      console.log('test');
      var heartedImages = document.getElementById('heartedimagelist');
      var listedImage = document.createElement('img');
      listedImage.src = Location.locationsArray[i].src;
      heartedImages.appendChild(listedImage);
    } else if(Location.locationsArray[i].hearted  === false){
      var heartedImages = document.getElementById('heartedimagelist');
      var listedImage = document.createElement('img');
      listedImage.textContent = '';
      heartedImages.appendChild(listedImage);
    }
//================================
      

    }
  }
  retrieveLocationsFromStorage();
  Location.locationsArray[0].displayHeartedImages(); 




  

    
    
   
 







// this line fills Location.locationArray with the objects in local storage

//============================


