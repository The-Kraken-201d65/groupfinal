'use strict';

var storageKeys = ['currentIndexOfLastImage', 'commentsection', 'locationsArray', 'dark-mode', 'aboutmeInput', 'avatarDiv'];

function User(name, currentIndexOfLastImage, commentSection, locationsArray, darkMode, aboutMeInput, avatarDiv) {
  this.name;
  this.currentIndexOfLastImage = currentIndexOfLastImage || 0;
  this.commentSection = commentSection || null;
  this.locationsArray = locationsArray || null;
  this.darkMode = darkMode || false;
  this.aboutMeInput = aboutMeInput || null;
  this.avatarDiv = avatarDiv || null;
  this.refArray = [];

  User.userArray.push(this);
}

User.userArray = [];

User.prototype.fillRefArray = function() {
  this.refArray = [];
  this.refArray.push(this.currentIndexOfLastImage);
  this.refArray.push(this.commentSection);
  this.refArray.push(this.locationsArray);
  this.refArray.push(this.darkMode);
  this.refArray.push(this.aboutMeInput);
  this.refArray.push(this.avatarDiv);
};

User.prototype.updateUserInfo = function(checkName) {
  if (this.name === checkName) {
    var storedValue;
    var parsedValues = [];
    for (var i = 0; i < storageKeys.length; i++) {
      storedValue = localStorage.getItem(storageKeys[i]);
      parsedValues.push(JSON.parse(storedValue));
    }
    this.currentIndexOfLastImage = parsedValues[0] || 0;
    this.commentSection = parsedValues[1] || null;
    this.locationsArray = parsedValues[2] || null;
    this.darkMode = parsedValues[3] || false;
    this.aboutMeInput = parsedValues[4] || null;
    this.avatarDiv = parsedValues[5] || null;
    return true;
  } else {
    return false;
  }
};

// eslint-disable-next-line no-unused-vars
function checkUsersForUpdate(checkName) {
  var foundUser = false;
  for (var i = 0; i < User.userArray.length; i++) {
    if (User.userArray[i].updateUserInfo(checkName)) {
      foundUser = true;
      return foundUser;
    }
  }
  if (!foundUser) {
    // 
    return foundUser;
  }
}

User.prototype.setUserToLocalStorage = function() {
  this.fillRefArray();
  var stringyValue;
  for (var i = 0; i < this.refArray.length; i++) {
    if (this.refArray[i]) {
      stringyValue = JSON.stringify(this.refArray[i]);
      localStorage.setItem(storageKeys[i], stringyValue);
    }
  }
};

function checkUsersForRetrieve(newName) {
  var foundUser = false;
  for (var i = 0; i < User.userArray.length; i++) {
    if (User.userArray[i].name === newName) {
      foundUser = true;
      User.userArray[i].setUserToLocalStorage();
      return foundUser;
    }
  }
  if (!foundUser) {
    new User(newName);
    // clearing local storage
    // https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript
    localStorage.clear();
  }
}

// sample usage
// checkUsersForUpdate(previousUserName);
// checkUsersForUpdate(newUserName);

