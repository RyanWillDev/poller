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
