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
.filter('mostVotes', mostVotes);
