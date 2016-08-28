/*******************
Directives
********************/

function createNewPollBtn() {
  return {
    scope: {
      toggleValue: '='
    },
    restrict: 'E',
    templateUrl: 'templates/createNewPollBtn.html'
  };
}


function pollOptionsInput() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pollOptionsInput.html'
  };
}

function addPollOptionsBtn() {
  return {
    scope: {
      clickHandler: '&'
    },
    restrict: 'E',
    templateUrl: 'templates/addPollOptionsBtn.html'
  };
}

function pollsListItem() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pollsListItem.html'
  };
}

function pollResultsDetails() {
  return {
    scope: {
      selectedPoll: '<',
      clickHandler: '='
    },
    restrict: 'E',
    templateUrl: 'templates/pollResultsDetails.html'
  };
}
