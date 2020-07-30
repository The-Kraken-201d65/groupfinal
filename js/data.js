'use strict';

// referencing Chartjs docs throughout
// https://www.chartjs.org/docs/latest/

Location.locationsArray = [];

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
  console.log('original', Location.locationsArray);
  console.log('result', sortedByPopArray);

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
            beginAtZero: true
          }
        }]
      }
    }
  });
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
retrieveLocationsFromStorage();
renderPopularityChart();



