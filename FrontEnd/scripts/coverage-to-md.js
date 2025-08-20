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
  branches: 0,
  branchesCov: 0,
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

    const branchesTotal = Object.values(bMap).reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);
    const branchesCovered = Object.values(bMap).reduce(
      (acc, arr) => acc + (arr ? arr.filter((x) => x > 0).length : 0),
      0
    );

    const linesTotal = entry.l ? Object.keys(entry.l).length : stmtsTotal;
    const linesCovered = entry.l
      ? Object.values(entry.l).filter((v) => v > 0).length
      : stmtsCovered;

    totals.stmts += stmtsTotal;
    totals.stmtsCov += stmtsCovered;
    totals.funcs += funcsTotal;
    totals.funcsCov += funcsCovered;
    totals.branches += branchesTotal;
    totals.branchesCov += branchesCovered;
    totals.lines += linesTotal;
    totals.linesCov += linesCovered;

    // shorten path for readability
    const short = entry.path ? path.relative(process.cwd(), entry.path) : key;

    rows.push({
      file: short || key,
      stmts: `${pct(stmtsCovered, stmtsTotal)} (${stmtsCovered}/${stmtsTotal})`,
      branch: `${pct(branchesCovered, branchesTotal)} (${branchesCovered}/${branchesTotal})`,
      funcs: `${pct(funcsCovered, funcsTotal)} (${funcsCovered}/${funcsTotal})`,
      lines: `${pct(linesCovered, linesTotal)} (${linesCovered}/${linesTotal})`,
    });
  });

// Output Markdown table
console.log('| File | Stmts | Branch | Funcs | Lines |');
console.log('| --- | ---: | ---: | ---: | ---: |');
rows.forEach((r) => {
  console.log(`| ${r.file} | ${r.stmts} | ${r.branch} | ${r.funcs} | ${r.lines} |`);
});
console.log(
  `| **Total** | ${pct(totals.stmtsCov, totals.stmts)} (${totals.stmtsCov}/${totals.stmts}) | ${pct(totals.branchesCov, totals.branches)} (${totals.branchesCov}/${totals.branches}) | ${pct(totals.funcsCov, totals.funcs)} (${totals.funcsCov}/${totals.funcs}) | ${pct(totals.linesCov, totals.lines)} (${totals.linesCov}/${totals.lines}) |`
);
