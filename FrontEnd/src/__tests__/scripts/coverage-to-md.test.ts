import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

let directory: string;
let summaryPath: string;
const script = path.resolve('scripts', 'coverage-to-md.js');

function run(threshold = '30') {
  return spawnSync(process.execPath, [script, summaryPath, threshold], { encoding: 'utf8' });
}

function writeSummary(overrides: Record<string, number> = {}) {
  const total = Object.fromEntries(
    ['statements', 'branches', 'functions', 'lines'].map((metric) => {
      const covered = overrides[metric] ?? 70;
      return [metric, { total: 100, covered, skipped: 0, pct: covered }];
    })
  );
  writeFileSync(summaryPath, JSON.stringify({ total }));
}

beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), 'tnk-coverage-'));
  summaryPath = path.join(directory, 'coverage-summary.json');
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

it('reports exact Istanbul summary totals, including informational branch coverage', () => {
  writeSummary({ branches: 0, lines: 65, functions: 30 });
  const result = run();
  expect(result.status).toBe(0);
  expect(result.stdout).toContain('| branches | 0% | 0/100 |');
  expect(result.stdout).toContain('| lines | 65% | 65/100 |');
  expect(result.stdout).toContain('| functions | 30% | 30/100 |');
  expect(result.stdout).toContain('**Status:** Pass');
});

it.each(['statements', 'functions', 'lines'])(
  'fails when %s is below the CI threshold',
  (metric) => {
    writeSummary({ [metric]: 29 });
    const result = run();
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('**Status:** Fail');
  }
);

it('uses a supplied threshold without a separate hard-coded function threshold', () => {
  writeSummary({ functions: 49 });
  expect(run('50').status).toBe(1);
  expect(run('49').status).toBe(0);
});

it('fails explicitly when the summary is missing', () => {
  const result = run();
  expect(result.status).toBe(2);
  expect(result.stderr).toContain('Unable to read coverage summary');
});

it.each(['not JSON', '{}', '{"total":{"lines":{"pct":100}}}'])(
  'rejects malformed or incomplete summaries: %s',
  (contents) => {
    writeFileSync(summaryPath, contents);
    const result = run();
    expect(result.status).toBe(2);
    expect(result.stderr).not.toBe('');
    expect(result.stdout).not.toContain('Pass');
  }
);

it.each(['NaN', '-1', '101'])('rejects invalid threshold %s', (threshold) => {
  writeSummary();
  expect(run(threshold).status).toBe(2);
});
