'use strict';

// referencing Chartjs docs throughout
// https://www.chartjs.org/docs/latest/

Location.locationsArray = [];

// var userArray = [];

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

if (localStorage.getItem('username')){
  var prevUserName = JSON.parse(localStorage.getItem('username'));
  checkUsersForUpdate(prevUserName);
  console.log('found user and updated local storage');
}




// eslint-disable-next-line no-redeclare
function Location(name, src, hearted) {
  this.name = name;
  this.src = src;
  this.hearted = hearted || false;
  this.thumbDown = false;
  this.totalHearted = 0;

  if (this.hearted) {
    this.totalHearted++;
  }

  Location.locationsArray.push(this);
}

function createSortByHeartArray(locArray) {
  // copying an array into another array
  // https://stackoverflow.com/questions/16232915/copying-an-array-of-objects-into-another-array-in-javascript
  var tempArray = Array.from(locArray);
  var sortedArray = [];
  var popularIndex;
  var popularCount;
  while (tempArray.length > 0) {
    popularIndex = 0;
    popularCount = 0;
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].totalHearted > popularCount) {
        popularCount = tempArray[i].totalHearted;
        popularIndex = i;
      }
    }
    sortedArray.push(tempArray.splice(popularIndex, 1)[0]);
  }
  return (sortedArray);
}

function renderPopularityChart() {

  var sortedByPopArray = createSortByHeartArray(Location.locationsArray);

  var locationLabels = [];
  for (var i = 0; i < sortedByPopArray.length; i++) {
    locationLabels.push(sortedByPopArray[i].name);
  }

  var heartedData = [];
  for (i = 0; i < sortedByPopArray.length; i++) {
    heartedData.push(sortedByPopArray[i].totalHearted);
  }

  var bgColorPalette = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)'
  ];

  var bgColors = [];
  for (i = 0; i < sortedByPopArray.length; i++) {
    bgColors.push(bgColorPalette[i % bgColorPalette.length]);
  }

  var borderColorPalette = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  var borderColors = [];
  for (i = 0; i < sortedByPopArray.length; i++) {
    borderColors.push(borderColorPalette[i % borderColorPalette.length]);
  }

  var ctx = document.getElementById('popularLocations').getContext('2d');
  var myChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: locationLabels,
      datasets: [{
        label: 'Hearted Locations Sorted By Popularity',
        data: heartedData,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            // reference for forcing integer scale
            // https://stackoverflow.com/questions/15751571/change-the-y-axis-values-from-real-numbers-to-integers-in-chart-js
            callback: function(value) {if (value % 1 === 0) {return value;}}
          }
        }]
      }
    }
  });
}
//for dark mode
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_dark_mode
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



new Location('kayangan-lake', 'images/1 kayangan-lake.jpg');
new Location('river', 'images/2 river-natl-park.jpg');
new Location('barracuda-lake', 'images/3 barracuda lake.jpg');
new Location('tubbataha Reef', 'images/4 tubbataha-reef-philippines.jpg');
new Location('Nacpan beach', 'images/5 Nacpan-Beach-Palawan-Cover-min.jpg');
new Location('Big Lagoon', 'images/6 big lagoon.jpg');
new Location('Port Barton', 'images/7 Port_Barton-aerial-10.jpg');
new Location('Twin Lagoon', 'images/8 Twin-Lagoon-El-Nido-Palawan-Philippines.jpg');
new Location('Ugong Rock Adventures', 'images/9 ugong rock adventures.jpg');
new Location('Estrella', 'images/10 estrella falls.jpg');


console.log(Location.locationsArray);
console.log(userArray);
for (var userIndex = 0; userIndex < userArray.length; userIndex++) {
  if (userArray[userIndex].locationsArray) {
    for (var locationIndex = 0; locationIndex < userArray[userIndex].locationsArray.length; locationIndex++) {
      if (userArray[userIndex].locationsArray[locationIndex].hearted) {
        for (var sumIndex = 0; sumIndex < Location.locationsArray.length; sumIndex++) {
          if (Location.locationsArray[sumIndex].name === userArray[userIndex].locationsArray[locationIndex].name) {
            Location.locationsArray[sumIndex].totalHearted++;
          }
        }
      }
    }
  }
}

renderPopularityChart();



