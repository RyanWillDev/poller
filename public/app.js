/*******************
App
********************/

var Poller = angular.module('Poller', ['templates-main'])

// Add Controllers
.controller('MainPollCtrl', MainPollCtrl)
.controller('CreatePollCtrl', CreatePollCtrl)
.controller('PollResultsCtrl', PollResultsCtrl)

// Add Directives
.directive('createNewPollBtn', createNewPollBtn)
.directive('pollOptionsInput', pollOptionsInput)
.directive('addPollOptionsBtn', addPollOptionsBtn)
.directive('pollsListItem', pollsListItem)
.directive('pollResultsDetails', pollResultsDetails)

// Filters
.filter('mostVotes', mostVotes)
.filter('getValue', getValue);

/*******************
Controllers
********************/

MainPollCtrl.$inject = ['$scope'];

function MainPollCtrl($scope) {
  var vm = this;
  $scope.polls = [];

  vm.pollSelected = pollSelected;

  function pollSelected(event, index) {
    // Add selected class for styling
    angular.element(event.target).addClass('selected');
    $scope.$broadcast('pollSelected', index);
  }
}

CreatePollCtrl.$inject = ['$scope'];

function CreatePollCtrl($scope) {
  // Captures $scope to push to MainCtrl
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
  vm.resetPoll = resetPoll;

  function addPoll() {
    // Adds newly created poll to the MCtrl's list

    // Uses Object.assign because only a reference to the poll
    // was being added to the polls array
    // when calling reset it would reset the poll array
    var newPoll = Object.assign({}, vm.poll);
    newPoll.options = vm.poll.options.filter(filterEmpty);
    MainCtrl.polls.push(newPoll);
    vm.resetPoll();

    // Pull empty options out of array
    function filterEmpty(opt) {
      return opt.option !== '';
    }
  }

  function resetPoll() {
    // Makes sure there is always at least 2 options
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
}

PollResultsCtrl.$inject = ['$scope'];

function PollResultsCtrl($scope) {
  var vm = this;
  vm.test = 'test';
  vm.selectedPoll = '';
  vm.addVote = addVote;

  $scope.$on('pollSelected', showPollDetails);

  function showPollDetails(event, i) {
    var MainCtrl = $scope;
    vm.selectedPoll = MainCtrl.polls[i];
  }

  function addVote(index) {
    vm.selectedPoll.options[index].votes++;
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

function pollResultsDetails() {
  return {
    scope: {
      selectedPoll: '<',
      clickHandler: '<'
    },
    restrict: 'E',
    templateUrl: 'templates/pollResultsDetails.html'
  };
}

function mostVotes() {
  return function(arr) {
    if (arr) {
      var filteredArr = arr.reduce(function(prevOpt, nextOpt) {
        if (prevOpt.votes > nextOpt.votes) {
          return prevOpt;
        } else {
          return nextOpt;
        }
      });
      return filteredArr;
    }
  };
}

function getValue() {
  return function(obj, key) {
    if (obj) {
      return obj[key];
    }
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
  $templateCache.put("templates/pollResultsDetails.html",
    "<div><span>{{selectedPoll.title}}</span><div ng-repeat=\"option in selectedPoll.options\"><span>{{option.option}}</span> <span>{{option.votes}}</span><button ng-click=clickHandler($index)>Vote</button></div>{{ selectedPoll.options | mostVotes | getValue:'votes' }}</div>");
  $templateCache.put("templates/pollsListItem.html",
    "<li><h3>{{poll.title}}</h3></li>");
}]);
