'user strict';

Location.locationsArray = [];


function Location(name, src, hearted) {
  this.name = name;
  this.src = src;
  this.hearted = hearted || false;
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
    new Location(
      unlabeledLocations[i].name,
      unlabeledLocations[i].src,
      unlabeledLocations[i].hearted);
  }
}
//===============================

Location.prototype.displayHeartedImages = function(){
  for (var i = 0; i < Location.locationsArray.length; i ++){
    if( Location.locationsArray[i].hearted === true){
      var heartedImages = document.getElementById('heartedimagelist');
      var listedImage = document.createElement('img');
      listedImage.src = Location.locationsArray[i].src;
      heartedImages.appendChild(listedImage);
    } 
    }
//================================
  } 

  
  

  
      
if (localStorage.getItem('locationsArray')) {
  retrieveLocationsFromStorage();
  Location.locationsArray[0].displayHeartedImages();
}



// add submit button
// add event listener to submit button, save to local storage
// when submit button is hit, render allAvatar[i].src
// create a function that renders allAvatar[i].src


function addItemsToAvatar (){
  var selectElement = document.getElementById('avatar-selection');
  for (var i in Avatar.allAvatar) {
    var optionElement = document.createElement('option');
    optionElement.textContent = Avatar.allAvatar[i].name;
    selectElement.appendChild(optionElement);
    }
  }

 
var Avatar = function(src, name) {
  this.src = src;
  this.name = name;
  Avatar.allAvatar.push(this);
};
Avatar.allAvatar = [];

var avatarSubmit = document.getElementById('avatarCreate');
avatarSubmit.addEventListener('submit', renderAvatarImage);


function renderAvatarImage(event){
  event.preventDefault();
  var targetItems = document.getElementById('avatar-selection');
  var itemsValue = targetItems.value;

  var stringyAvatar = JSON.stringify(itemsValue);
  localStorage.setItem('avatarDiv', stringyAvatar);

  var deleteStuff = document.querySelector('#avatarDiv > img');
  for(var i = 0; i < Avatar.allAvatar.length; i++){
    if(itemsValue  === Avatar.allAvatar[i].name){
      if(deleteStuff){
      deleteStuff.remove();
    }
      var createdDiv = document.getElementById('avatarDiv');
      var listItem = document.createElement('img');
      listItem.src = Avatar.allAvatar[i].src;
      createdDiv.appendChild(listItem);
    }
    }
  }

  function generateAvatar() {
    new Avatar('images/heart.png', 'heart');
    new Avatar('images/thumbdown.png', 'heart 2.0');
    new Avatar('images/heart.png', 'heart 3.0');
  }
  
  generateAvatar();
  addItemsToAvatar();

var avatarStored = localStorage.getItem('avatarDiv');
console.log(avatarStored)
if(avatarStored !== null){
  var parsedAvatar = JSON.parse(avatarStored);
  for(var i =0; i < Avatar.allAvatar.length; i++){ 
    if(parsedAvatar === Avatar.allAvatar[i].name){
      var createdDiv = document.getElementById('avatarDiv');
      var listItem = document.createElement('img');
      listItem.src = Avatar.allAvatar[i].src;
      createdDiv.appendChild(listItem);
    }
  }
}

var aboutMeSection = document.getElementById('profileFormPls');
aboutMeSection.addEventListener('submit', aboutmeContent);
var informationArray = [];

function aboutmeContent(event) {
  event.preventDefault();
  var bioInformation = event.target.commentInput.value;

  informationArray.push(bioInformation)
  var stringyComment = JSON.stringify(informationArray);
  localStorage.setItem('aboutmeInput', stringyComment);
  var cmSection = document.getElementById('aboutmeInput')
  var listItem = document.createElement('li');
  listItem.textContent = bioInformation;
  cmSection.appendChild(listItem);

}
var commentFromStorage = localStorage.getItem('aboutmeInput');
if(commentFromStorage !== null){
  var parsedComment = JSON.parse(commentFromStorage);
  informationArray = parsedComment;
  for(var i = 0; i < informationArray.length; i++){
    var cmSection = document.getElementById('aboutmeInput');
    var listItem = document.createElement('li');
    listItem.textContent = parsedComment[i];
    cmSection.appendChild(listItem);
  }
}
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

DONE: test and updated to match with testbranch
*/

function renderRemoveButton() {
  // This function checks how many hearted images are displayed and adds
  // a text 'X' next to each image

  var imageElArray = document.querySelectorAll('main > div > ul > li > img');
  // var imageCount = imageLiEl.children.length;
  for (var childEl = 0; childEl < imageElArray.length; childEl++) {
    var xTextEl = document.createElement('p');

    xTextEl.textContent = 'X';
    xTextEl.id = 'removeHearted';
    xTextEl.style.height = '20px';
    xTextEl.style.width = '20px';
    xTextEl.style.color = 'red';
    xTextEl.style.float = 'left';
    xTextEl.style.marginTop = '100px';

    // reference for adding an element before another
    // https://www.w3schools.com/jsref/met_node_insertbefore.asp
    imageElArray[childEl].parentNode.insertBefore(xTextEl, imageElArray[childEl + 1]);

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





