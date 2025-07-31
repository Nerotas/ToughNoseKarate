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
  const createdBy = DataGridHelpers.getCreated('', mockRow);

  expect(createdBy).toStrictEqual('2022-10-26 (testuser@erotas.test)');
});

it('getDeprecatedDate should return empty string for null data', () => {
  const mockRow = mockProducts[0];
  const getDeprecatedDate = DataGridHelpers.getDeprecatedDate('', mockRow);

  expect(getDeprecatedDate).toStrictEqual('');
});

it('getDeprecatedDate should return user readable date', () => {
  const mockRow = mockProducts[1];
  const getDeprecatedDate = DataGridHelpers.getDeprecatedDate('', mockRow);

  expect(getDeprecatedDate).toStrictEqual('2022-10-26');
});

it('getAccount should return all string for null data', () => {
  const mockRow: any[] = [];
  const getAccount = DataGridHelpers.getAccount('', mockRow);
  expect(getAccount).toStrictEqual('ALL');
});

it('getAccount should return user readable date', () => {
  const mockRow = mockProducts[0];
  const getAccount = DataGridHelpers.getAccount('', mockRow);
  expect(getAccount).toStrictEqual('backcountry (11)');
});

it('getPersonName should return person name and ID', () => {
  const mockRow = mockProducts[0];
  const getAccount = DataGridHelpers.getPersonName('', mockRow);
  expect(getAccount).toStrictEqual('women (0)');
});

it('getProductSection should return product section name and ID', () => {
  const mockRow = mockProducts[0];
  const getAccount = DataGridHelpers.getProductSection('', mockRow);
  expect(getAccount).toStrictEqual('Complex-Dress (1)');
});
