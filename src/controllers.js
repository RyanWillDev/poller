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
