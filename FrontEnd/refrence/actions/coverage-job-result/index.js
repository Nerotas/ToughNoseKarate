const core = require('@actions/core');

try {
  const compareResult = core.getInput('compareResult');

  if (compareResult === 'failure') {
    core.setFailed("Coverage comparison check hasn't passed");
  }
  
} catch (error) {
  core.setFailed(error.message);
}
