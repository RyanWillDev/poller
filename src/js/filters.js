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
