import { DEFAULT_PAGE_SIZE } from 'constants/DataGridDefaults';
import * as DataGridHelpers from '../DataGrid';
import { cleanup } from '@testing-library/react';
import { mockProducts } from 'testingUtils/MockData/mockBeltRequirements';
afterEach(cleanup);

it('getPaginationOptions should return default', () => {
  const paginationOptions = DataGridHelpers.getPaginationOptions([]);

  expect(paginationOptions).toStrictEqual([DEFAULT_PAGE_SIZE]);
});

it('getPaginationOptions should return array with max value of rows', () => {
  let rows: number[] = new Array(37);

  rows = rows.fill(0); // Fills with 0s
  const paginationOptions = DataGridHelpers.getPaginationOptions(rows);

  expect(paginationOptions).toStrictEqual([5, 20, 37]);
});
