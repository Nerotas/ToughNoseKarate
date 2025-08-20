#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const usage = () => {
  console.error('Usage: node scripts/coverage-to-md.js <coverage-final.json>');
  process.exit(2);
};

if (process.argv.length < 3) usage();
const file = process.argv[2];
if (!fs.existsSync(file)) {
  console.error('Coverage file not found:', file);
  process.exit(3);
}

let raw;
try {
  raw = fs.readFileSync(file, 'utf8');
} catch (e) {
  console.error(e.message);
  process.exit(4);
}
let cov;
try {
  cov = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON in', file);
  process.exit(5);
}

function pct(covered, total) {
  if (!total) return '100.0%';
  return ((covered / total) * 100).toFixed(1) + '%';
}

const rows = [];
let totals = {
  stmts: 0,
  stmtsCov: 0,
  funcs: 0,
  funcsCov: 0,
  lines: 0,
  linesCov: 0,
};

Object.keys(cov)
  .sort()
  .forEach((key) => {
    const entry = cov[key] || {};
    const sMap = entry.s || {};
    const fMap = entry.f || {};
    const bMap = entry.b || {};

    const stmtsTotal = Object.keys(sMap).length;
    const stmtsCovered = Object.values(sMap).filter((v) => v > 0).length;

    const funcsTotal = Object.keys(fMap).length;
    const funcsCovered = Object.values(fMap).filter((v) => v > 0).length;

    const linesTotal = entry.l ? Object.keys(entry.l).length : stmtsTotal;
    const linesCovered = entry.l
      ? Object.values(entry.l).filter((v) => v > 0).length
      : stmtsCovered;

    totals.stmts += stmtsTotal;
    totals.stmtsCov += stmtsCovered;
    totals.funcs += funcsTotal;
    totals.funcsCov += funcsCovered;
    // branch coverage intentionally omitted from totals
    totals.lines += linesTotal;
    totals.linesCov += linesCovered;

    // shorten path for readability
    const short = entry.path ? path.relative(process.cwd(), entry.path) : key;

    rows.push({
      file: short || key,
      stmts: `${pct(stmtsCovered, stmtsTotal)} (${stmtsCovered}/${stmtsTotal})`,
      funcs: `${pct(funcsCovered, funcsTotal)} (${funcsCovered}/${funcsTotal})`,
      lines: `${pct(linesCovered, linesTotal)} (${linesCovered}/${linesTotal})`,
    });
  });

// Determine threshold: arg[3] or env COVERAGE_THRESHOLD or default 30
const rawThreshold = process.argv[3] || process.env.COVERAGE_THRESHOLD || '30';
const THRESHOLD = Number(rawThreshold);

function numPct(covered, total) {
  if (!total) return 100.0;
  return Number(((covered / total) * 100).toFixed(1));
}

const stats = {
  statements: {
    covered: totals.stmtsCov,
    total: totals.stmts,
    pct: numPct(totals.stmtsCov, totals.stmts),
  },
  functions: {
    covered: totals.funcsCov,
    total: totals.funcs,
    pct: numPct(totals.funcsCov, totals.funcs),
  },
  lines: {
    covered: totals.linesCov,
    total: totals.lines,
    pct: numPct(totals.linesCov, totals.lines),
  },
};

// Pass only requires statements, functions, and lines to meet threshold (branches omitted)
const pass =
  stats.statements.pct >= THRESHOLD &&
  stats.functions.pct >= THRESHOLD &&
  stats.lines.pct >= THRESHOLD;

// Output compact Markdown summary
console.log('# Frontend Coverage Report');
console.log('');
console.log('| Metric | % | Covered/Total |');
console.log('| --- | ---: | ---: |');
console.log(
  `| Statements | ${stats.statements.pct}% | ${stats.statements.covered}/${stats.statements.total} |`
);
// branches intentionally omitted from report and threshold
console.log(
  `| Functions  | ${stats.functions.pct}% | ${stats.functions.covered}/${stats.functions.total} |`
);
console.log(`| Lines      | ${stats.lines.pct}% | ${stats.lines.covered}/${stats.lines.total} |`);
console.log('');
console.log(`**Threshold:** ${THRESHOLD}%`);
console.log(`**Status:** ${pass ? 'Pass ✅' : 'Fail ❌'}`);

// Also return exit code 0 even on fail so workflow's separate threshold check controls job failure; but
// print numeric result for programmatic checks if needed.
process.exit(0);
