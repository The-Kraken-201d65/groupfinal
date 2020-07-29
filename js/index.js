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

  for(var locationIndex = 0; locationIndex < Location.locationsArray.length; locationIndex++){

    // if(Location.locationsArray[locationIndex].src === event.target.getAttribute('src')){
    if(Location.locationsArray[locationIndex].src === Location.locationsArray[locationArrayIndex-1].src){

      Location.locationsArray[locationIndex].hearted = true;

    }

  }

  Location.locationsArray[0].saveToLocalStorage();


  displayLocationImage();




}


function clickThumbDownOnImage(event) {

  for(var locationIndex = 0; locationIndex < Location.locationsArray.length; locationIndex++){

    // if(Location.locationsArray[locationIndex].src === event.target.getAttribute('src')){
    if(Location.locationsArray[locationIndex].src === Location.locationsArray[locationArrayIndex-1].src){

      Location.locationsArray[locationIndex].thumbDown = true;

    }

  }

  Location.locationsArray[0].saveToLocalStorage();


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

var heartButton = document.getElementById('hearted');
heartButton.addEventListener('click', clickHeartOnImage);

var thumbDownButton = document.getElementById('thumbDown');
thumbDownButton.addEventListener('click', clickThumbDownOnImage);

new Location('kayangan-lake', 'images/kayangan-lake.jpg');
new Location('river', 'images/river-natl-park.jpg');
new Location('barracuda-lake', 'images/barracuda-lake.jpg');

displayLocationImage();



//===============

var commentSection = document.getElementById('addcomments');
commentSection.addEventListener('submit', createAComment);

function createAComment(event) {
  event.preventDefault()

  var comments = event.target.commentInput.value
  var nameComments = event.target.nameInput.value

  var cmSection = document.getElementById('commentsection')
  var listItem = document.createElement('li');
  listItem.textContent = nameComments + ' : ' + comments;
  cmSection.appendChild(listItem);

}



function myDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
















  // DONE: Find the table body

  // DONE: Iterate over the items in the cart



//================





