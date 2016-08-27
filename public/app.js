/*******************
App
********************/

var Poller = angular.module('Poller', ['templates-main'])

// Add Controllers
.controller('MainPollCtrl', MainPollCtrl)
.controller('CreatePollCtrl', CreatePollCtrl)

// Add Directives
.directive('createNewPollBtn', createNewPollBtn)
.directive('pollOptionsInput', pollOptionsInput)
.directive('addPollOptionsBtn', addPollOptionsBtn)
.directive('pollsListItem', pollsListItem);

/*******************
Controllers
********************/

function MainPollCtrl($scope) {
  $scope.polls = [];
}

function CreatePollCtrl($scope) {
  var MainCtrl = $scope;
  var vm = this;
  vm.optionCount = 2;
  vm.creatingNewPoll = false;
  vm.poll = {
    title: '',
    options: [{ option: '', votes: 0 }, { option: '', votes: 0 }]
  };
  vm.addPoll = addPoll;
  vm.addPollOption = addPollOption;
  vm.removePollOption = removePollOption;
  vm.resetPoll = resetPoll;

  function addPoll() {
    // Adds newly created poll to the MCtrl's list
    var newPoll = Object.assign({}, vm.poll);
    MainCtrl.polls.push(newPoll);
    vm.resetPoll();
  }

  function resetPoll() {
    vm.poll.options = [{ option: '', votes: 0 }, { option: '', votes: 0 }];
    vm.poll.title = '';
    vm.creatingNewPoll = false;
  }

  function addPollOption() {
    // Run ng-click add button
    // Adds option to the options array
    if (vm.optionCount <= 10) {
      vm.poll.options.push({ option: '', votes: 0 });
      vm.optionCount++;
    }
    else {
      alert('There is a 10 option limit per poll');
    }
  }

  function removePollOption() {
    // Run ng-click add button
    // Removes option from the options array
  }
}

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

angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("templates/addPollOptionsBtn.html",
    "<button ng-click=clickHandler()>add option</button>");
  $templateCache.put("templates/createNewPollBtn.html",
    "<button ng-click=\"toggleValue = !toggleValue\">Create a new poll</button>");
  $templateCache.put("templates/pollOptionsInput.html",
    "<input placeholder=\"Add a Poll Option\" ng-model=\"cpc.poll.options[$index].option\">");
  $templateCache.put("templates/pollsListItem.html",
    "<li><h3>{{poll.title}}</h3></li>");
}]);
