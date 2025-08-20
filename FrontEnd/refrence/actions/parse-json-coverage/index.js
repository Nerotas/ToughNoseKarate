const core = require('@actions/core');
const fs = require('fs');

try {
    let coverageFileRaw;
    const input = core.getInput('coverageSummary');
    if (input) {
        coverageFileRaw = fs.readFileSync(`${input}`);
    } else {
        coverageFileRaw = fs.readFileSync('./coverage/coverage-summary.json');
    }
    console.log(`Coverage summary is ${coverageFileRaw}`);
    const coverageSummary = JSON.parse(coverageFileRaw);
    const linesCov = coverageSummary?.total?.lines?.pct || 0;
    const statementsCov = coverageSummary?.total?.statements?.pct || 0;
    const functionsCov = coverageSummary?.total?.functions?.pct || 0;
    const branchesCov = coverageSummary?.total?.branches?.pct || 0;
    const result = JSON.stringify({ lines: linesCov, statements: statementsCov, functions: functionsCov, branches: branchesCov });
    const resultTable = `| Lines | Statements | Functions | Branches |
  | - | - | - | - |
  | ${linesCov}% | ${statementsCov}% | ${functionsCov}% | ${branchesCov}% |`;
    console.log(result);
    core.setOutput('coverageResult', result);
    core.setOutput('coverageResultTable', resultTable);
} catch (error) {
    core.setFailed(error.message);
}
