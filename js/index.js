'user strict';


Location.locationsArray = [];
var totalClicks = 0;
var roundsOfClicks = 10;

//constructor
function Location(name, src, hearted, thumbDown) {

  this.name = name;
  this.src = src;
  this.hearted = hearted || false;
  this.thumbDown = thumbDown || false;


  Location.locationsArray.push(this);

}

Location.prototype.saveToLocalStorage = function () {
  // saves the current state of Location.locationsArray to local storage
  // to be retrieved in the profile
  var stringyLocations = JSON.stringify(Location.locationsArray);
  localStorage.setItem('locationsArray', stringyLocations);
};

//renders img to index.html
Location.prototype.renderLocations = function () {

  var target = document.getElementById('List-of-Images');
  var locationImg = document.createElement('img');
  locationImg.alt = this.name;
  locationImg.src = this.src;
  target.appendChild(locationImg);


};

function clickHeartOnImage(event) {


  if(totalClicks === roundsOfClicks){
    console.log('clickHeartOnImage-if');

    var imageList = document.getElementById('List-of-Images');
    imageList.innerHTML = '';

    heartButton.removeEventListener('click', clickHeartOnImage);
  } else{

    for(var locationIndex = 0; locationIndex < Location.locationsArray.length; locationIndex++){

      // if(Location.locationsArray[locationIndex].src === event.target.getAttribute('src')){
      if(Location.locationsArray[locationIndex].src === Location.locationsArray[locationArrayIndex].src){

        Location.locationsArray[locationIndex].hearted = true;

      }

    }

    Location.locationsArray[0].saveToLocalStorage();


    console.log('clickHeartOnImage-else');

    locationArrayIndex++;
    totalClicks++;
    if(totalClicks !== roundsOfClicks){
      displayLocationImage();
    } else{
      clickHeartOnImage();
    }


  }

}


function clickThumbDownOnImage(event) {

  if(totalClicks === roundsOfClicks){

    var imageList = document.getElementById('List-of-Images');
    imageList.innerHTML = '';

    thumbDownButton.removeEventListener('click', clickThumbDownOnImage);
  } else{

    for(var locationIndex = 0; locationIndex < Location.locationsArray.length; locationIndex++){

      // if(Location.locationsArray[locationIndex].src === event.target.getAttribute('src')){
      if(Location.locationsArray[locationIndex].src === Location.locationsArray[locationArrayIndex].src){

        Location.locationsArray[locationIndex].thumbDown = true;

      }

    }

    Location.locationsArray[0].saveToLocalStorage();

    console.log('clickThumbDownOnImage-else');

    locationArrayIndex++;
    totalClicks++;
    if(totalClicks !== roundsOfClicks){
      displayLocationImage();
    } else{
      clickThumbDownOnImage();
    }

  }

  // totalClicks++;

}


var locationArrayIndex = 0;

function displayLocationImage() {

  var currentImage = document.getElementById('List-of-Images');
  currentImage.innerHTML = '';
  Location.locationsArray[locationArrayIndex].renderLocations();
  // locationArrayIndex++;

  var stringyCurrentLocationArrayIndex = JSON.stringify(locationArrayIndex);
  localStorage.setItem('currentIndexOfLastImage', stringyCurrentLocationArrayIndex);

}


// ============================ function calls ============================

var heartButton = document.getElementById('hearted');
heartButton.addEventListener('click', clickHeartOnImage);

var thumbDownButton = document.getElementById('thumbDown');
thumbDownButton.addEventListener('click', clickThumbDownOnImage);

var locationsFromLocalStorage = localStorage.getItem('locationsArray');
var parsedLocations = JSON.parse(locationsFromLocalStorage);


if(parsedLocations !== null){


  for(var i = 0; i < parsedLocations.length; i++){

    var reconstituedLocations = new Location(parsedLocations[i].name, parsedLocations[i].src, parsedLocations[i].hearted, parsedLocations[i].thumbDown);

  }

  var currentIndexOfLastImageFromLocalStorage = localStorage.getItem('currentIndexOfLastImage');
  var parsedcurrentIndexOfLastImage = JSON.parse(currentIndexOfLastImageFromLocalStorage);

  locationArrayIndex = parsedcurrentIndexOfLastImage;

  totalClicks = parsedcurrentIndexOfLastImage;


  displayLocationImage();


} else {
  new Location('kayangan-lake', 'images/1 kayangan-lake.jpg');
  new Location('river', 'images/2 river-natl-park.jpg');
  new Location('barracuda-lake', 'images/3 barracuda lake.jpg');
  new Location('tubbataha Reef', 'images/4 tubbataha-reef-philippines.jpg');
  new Location('Nacpan beach', 'images/5 Nacpan-Beach-Palawan-Cover-min.jpg');
  new Location('Nacpan beach', 'images/6 big lagoon.jpg');
  new Location('Nacpan beach', 'images/7 Port_Barton-aerial-10.jpg');
  new Location('Nacpan beach', 'images/8 Twin-Lagoon-El-Nido-Palawan-Philippines.jpg');
  new Location('Nacpan beach', 'images/9 ugong rock adventures.jpg');
  new Location('Nacpan beach', 'images/10 estrella falls.jpg');


  displayLocationImage();

}




//===============

var commentSection = document.getElementById('addcomments');
commentSection.addEventListener('submit', createAComment);
var commentsArray = [];

function createAComment(event) {
  event.preventDefault()
  var comments = event.target.commentInput.value
  var nameComments = event.target.nameInput.value
  //saves the info
  commentsArray.push(nameComments + ' : ' + comments)
  var stringyComment = JSON.stringify(commentsArray);
  localStorage.setItem('commentsection', stringyComment);
 
  // display info
  var cmSection = document.getElementById('commentsection')
  var listItem = document.createElement('li');
  listItem.textContent = nameComments + ' : ' + comments;
  cmSection.appendChild(listItem);

}


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


  function myDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    darkMode = !darkMode;
    console.log(darkMode);


    var locationDarkMode = JSON.stringify(darkMode);
    localStorage.setItem('dark-mode', locationDarkMode);  
    
  }



// display the saved info
var commentFromStorage = localStorage.getItem('commentsection');
if(commentFromStorage !== null){
  var parsedComment = JSON.parse(commentFromStorage);
  commentsArray = parsedComment;
  for(var i = 0; i < commentsArray.length; i++){
    var cmSection = document.getElementById('commentsection');
    var listItem = document.createElement('li');
    listItem.textContent = parsedComment[i];
    cmSection.appendChild(listItem);
  }
}



















  // DONE: Find the table body

  // DONE: Iterate over the items in the cart



//================





