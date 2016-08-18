var statesList = ["Alabama",
                  "Alaska",
                  "Arizona",
                  "Arkansas",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Hawaii",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Iowa",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Maine",
                  "Maryland",
                  "Massachusetts",
                  "Michigan",
                  "Minnesota",
                  "Mississippi",
                  "Missouri",
                  "Montana",
                  "Nebraska",
                  "Nevada",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "New York",
                  "North Carolina",
                  "North Dakota",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Vermont",
                  "Virginia",
                  "Washington",
                  "West Virginia",
                  "Wisconsin",
                  "Wyoming"];


var checkIfStatesMatch = function () {
// update display list every time a key is pressed

// clear old list before renewing display
  var currentUL = document.querySelector('.states-list');
  while (currentUL.firstChild) {
      currentUL.removeChild(currentUL.firstChild);
  }

  var userInput = document.querySelector('.input').value.toLowerCase();

  if (userInput === '') {
    document.querySelector('.states-list').style.display = "none";
  } else {
    document.querySelector('.states-list').style.display = "flex";
    var statesToDisplay = statesList.filter(function (state) {
      state = state.toLowerCase();
      if (state.includes(userInput)) {
        return state;
      }
    });

    if (statesToDisplay.length === 0) {
      document.querySelector('.states-list').style.display = "none";
    }

    // create a li for each state in statesToDisplay
    statesToDisplay.forEach(function (state) {
      var listItem = document.createElement('li');
      listItem.innerText = state;

      // add binding so that input field will populate on click
      listItem.addEventListener('click', function () {
        document.querySelector('.input').value = this.innerText;
        // hide ul once selection made
        document.querySelector('.states-list').style.display = "none";
      });

      document.querySelector('.states-list').appendChild(listItem);
    })
  }
}
