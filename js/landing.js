'use strict';


if (localStorage.getItem('userObjects')) {
  var tempArray = JSON.parse(localStorage.getItem('userObjects'));
  userArray = [];
  for (var i = 0; i < tempArray.length; i++) {
    new User(
      tempArray[i].name,
      tempArray[i].currentIndexOfLastImage,
      tempArray[i].commentSection,
      tempArray[i].locationsArray,
      tempArray[i].darkMode,
      tempArray[i].aboutMeInput,
      tempArray[i].avatarDiv,
      tempArray[i].reviewAdding
    );
  }
}



var linkButton = document.getElementById('takeMeToPlacesButton');
linkButton.addEventListener('click', handleUserChanges);

function handleUserChanges(event) {
  if (localStorage.getItem('username')){
    var prevUserName = JSON.parse(localStorage.getItem('username'));
    checkUsersForUpdate(prevUserName);
    console.log('found user and updated local storage');
  }
  
  var newUserName = document.getElementById('nameTextBox').value;
  if (checkUsersForRetrieve(newUserName)) {
    console.log('retrieved user');
  } else {
    console.log('created user');
  }

  localStorage.setItem('userObjects', JSON.stringify(userArray));
  localStorage.setItem('username', JSON.stringify(newUserName));
}
