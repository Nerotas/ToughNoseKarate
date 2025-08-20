const core = require('@actions/core');

try {
  const previousCoverage = JSON.parse(core.getInput('prevCoverage'));
  const currentCoverage = JSON.parse(core.getInput('currCoverage'));
  const compareBy = core.getInput('diffBy');
  const deviation = Number(core.getInput('deviation'));

  const currCoverageValue = Number(currentCoverage[compareBy])
  const difference = currCoverageValue - Number(previousCoverage[compareBy]);
  const result = difference >= 0 - deviation ? 'success' : 'failure'
  const resultIcon = difference >= 0 - deviation ? '✅' : '❌'

  console.log(`Coverage difference is ${difference}, result: ${result}`);
  core.setOutput("coverageDiff", difference);
  core.setOutput("coverageResult", result);
  core.setOutput("coverageResultIcon", resultIcon);
  core.setOutput("currCoverageValue", currCoverageValue);
  
} catch (error) {
  core.setFailed(error.message);
}
