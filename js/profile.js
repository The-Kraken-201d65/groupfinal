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



// === Jack adding "remove hearted image" functionality ===
/*
Steps to remove an image from display:
1. DONE: create a "x" to click next to each image (doing this step last)
2. DONE: make event listener to watch for clicks on x's
3. DONE: create event handler function that will:
  - remove image from displayed images
  - set corresponding location .hearted = false
  - save updated object list to local storage

TODO: test and updated to match with testbranch
*/

function renderRemoveButton() {
  // This function checks how many hearted images are displayed and adds
  // a text 'X' next to each image

  var imageUlEl = document.querySelector('main > div > ul');
  for (var childEl = 0; childEl < imageUlEl.children.length; childEl++) {
    var thisChildEl = imageUlEl.children[childEl];
    var xTextEl = document.createElement('p');

    xTextEl.textContent = 'X';
    xTextEl.id = 'removeHearted';
    xTextEl.style.height = '20px';
    xTextEl.style.width = '20px';
    xTextEl.style.color = 'red';
    xTextEl.style.float = 'left';
    xTextEl.style.marginTop = '100px';

    thisChildEl.appendChild(xTextEl);
  }
}

function handleHeartedImageRemoval(event) {
  if (event.srcElement.id === 'removeHearted') {
    // accessing the previous sibling node
    // https://www.w3schools.com/jsref/prop_node_previoussibling.asp
    var xTextEl = event.srcElement;
    var imageEl = xTextEl.previousSibling;
    // retrieving the src text of an img
    // https://stackoverflow.com/questions/10843322/getting-img-src-value-path-name
    var srcReference = imageEl.getAttribute('src');
    // removing a targeted element
    // https://www.w3schools.com/JSREF/met_element_remove.asp
    xTextEl.remove();
    imageEl.remove();

    for (var i = 0; i < Location.locationsArray.length; i++) {
      if (Location.locationsArray[i].src === srcReference) {
        Location.locationsArray[i].hearted = false;
      }
    }

    Location.locationsArray[0].saveToLocalStorage();
  }
}

renderRemoveButton();

var imageUlEl = document.querySelector('main > div > ul');
imageUlEl.addEventListener('click', handleHeartedImageRemoval);




