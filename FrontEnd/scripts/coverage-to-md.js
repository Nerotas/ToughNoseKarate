#!/usr/bin/env node
const fs = require('fs');

const file = process.argv[2];
const threshold = Number(process.argv[3] || process.env.COVERAGE_THRESHOLD || '30');
if (!file || !Number.isFinite(threshold) || threshold < 0 || threshold > 100) {
  console.error('Usage: node scripts/coverage-to-md.js <coverage-summary.json> [threshold: 0-100]');
  process.exit(2);
}

let summary;
try {
  summary = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  console.error(`Unable to read coverage summary: ${error.message}`);
  process.exit(2);
}

const metrics = ['statements', 'branches', 'functions', 'lines'];
const total = summary.total;
if (
  !total ||
  !metrics.every((metric) => {
    const value = total[metric];
    return (
      value &&
      Number.isFinite(value.pct) &&
      value.pct >= 0 &&
      value.pct <= 100 &&
      Number.isInteger(value.total) &&
      Number.isInteger(value.covered) &&
      value.covered >= 0 &&
      value.total >= value.covered
    );
  })
) {
  console.error(
    'Invalid coverage summary: expected totals for statements, branches, functions, and lines.'
  );
  process.exit(2);
}

const pass = ['statements', 'functions', 'lines'].every((metric) => total[metric].pct >= threshold);

console.log('# Frontend Coverage Report\n');
console.log('| Metric | % | Covered/Total |');
console.log('| --- | ---: | ---: |');
for (const metric of metrics) {
  const value = total[metric];
  console.log(`| ${metric} | ${value.pct}% | ${value.covered}/${value.total} |`);
}
console.log(
  `\n**Threshold:** ${threshold}% for statements, functions, and lines (branches informational)`
);
console.log(`**Status:** ${pass ? 'Pass' : 'Fail'}`);
process.exit(pass ? 0 : 1);
