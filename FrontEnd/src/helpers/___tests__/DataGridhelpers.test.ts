import { DEFAULT_PAGE_SIZE } from 'constants/DataGridDefaults';
import * as DataGridHelpers from '../DataGrid';
import { cleanup } from '@testing-library/react';
import { mockProducts } from 'testingUtils/MockData/mockProducts';
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

it('getPaginationOptions should max out at 100', () => {
  let rows: number[] = new Array(150);

  rows = rows.fill(0); // Fills with 0s
  const paginationOptions = DataGridHelpers.getPaginationOptions(rows);

  expect(paginationOptions).toStrictEqual([5, 20, 50, DEFAULT_PAGE_SIZE, 150]);
});

it('getCreated should return user readable string', () => {
  const mockRow = mockProducts[0];
  const createdBy = DataGridHelpers.getCreated('', {
    createdOnUtc: mockRow.createdOnUtc,
    createdByEmail: 'testuser@erotas.test',
  });

  expect(createdBy).toStrictEqual('2022-10-26 (testuser@erotas.test)');
});
