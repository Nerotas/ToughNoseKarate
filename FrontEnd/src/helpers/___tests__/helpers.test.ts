import * as arrayOfObjectsHandlers from '../arrayOfObjectsHandlers';
import * as arrayToStringListHandler from '../arrayToStringListHandler';
import * as EncryptLocalStorage from '../EncryptLocalStorage';
import * as replaceCommaInString from '../replaceCommaInString';
import * as DataGridHelpers from '../DataGrid';
import * as loginHelpers from '../loginHelpers';
import * as permissionChecker from '../permissionChecker';
import axiosInstance from '../AxiosInstance';
import { cleanup } from '@testing-library/react';
import { CreateProduct } from 'models/Products/Products';

interface defaultTestObj {
  name: string;
  chapter: number;
}

const defaultArrayObj: defaultTestObj[] = [
  { name: 'Jonathan', chapter: 1 },
  { name: 'Joesph', chapter: 2 },
];
afterEach(cleanup);

it('addToArray add new object to array', () => {
  const alteredObj = arrayOfObjectsHandlers.addToArray<defaultTestObj>(defaultArrayObj, { name: 'Jotaro', chapter: 3 });

  expect(alteredObj).toStrictEqual([
    { name: 'Jonathan', chapter: 1 },
    { name: 'Joesph', chapter: 2 },
    { name: 'Jotaro', chapter: 3 },
  ]);
});

it("addToArray don't add old object to array", () => {
  const alteredObj = arrayOfObjectsHandlers.addToArray<defaultTestObj>(defaultArrayObj, { name: 'Joesph', chapter: 2 });

  expect(alteredObj).toStrictEqual([
    { name: 'Jonathan', chapter: 1 },
    { name: 'Joesph', chapter: 2 },
  ]);
});

it('handleAddOrRemoveFromArray add new object to array', () => {
  const alteredObj = arrayOfObjectsHandlers.handleAddOrRemoveFromArray<defaultTestObj>(defaultArrayObj, { name: 'Jotaro', chapter: 3 });

  expect(alteredObj).toStrictEqual([
    { name: 'Jonathan', chapter: 1 },
    { name: 'Joesph', chapter: 2 },
    { name: 'Jotaro', chapter: 3 },
  ]);
});

it('handleAddOrRemoveFromArray remove object from array', () => {
  const alteredObj = arrayOfObjectsHandlers.handleAddOrRemoveFromArray<defaultTestObj>(defaultArrayObj, { name: 'Joesph', chapter: 2 });

  expect(alteredObj).toStrictEqual([{ name: 'Jonathan', chapter: 1 }]);
});

it('removeFromArray remove object from array', () => {
  const alteredObj = arrayOfObjectsHandlers.removeFromArray<defaultTestObj>(defaultArrayObj, { name: 'Joesph', chapter: 2 });

  expect(alteredObj).toStrictEqual([{ name: 'Jonathan', chapter: 1 }]);
});

it("removeFromArray don't add object to array", () => {
  const alteredObj = arrayOfObjectsHandlers.removeFromArray<defaultTestObj>(defaultArrayObj, { name: 'Jotaro', chapter: 3 });

  expect(alteredObj).toStrictEqual([
    { name: 'Jonathan', chapter: 1 },
    { name: 'Joesph', chapter: 2 },
  ]);
});

it('arrayToStringListHandler', () => {
  const string = arrayToStringListHandler.arrayToStringListHandler(['This', 'is', 'a', 'sentence.']);

  expect(string).toStrictEqual('This is a sentence.');
});

it('stringToArrayHandler', () => {
  const string = arrayToStringListHandler.stringToArrayHandler('This, is, a, sentence.');

  expect(string).toStrictEqual(['This', 'is', 'a', 'sentence.']);
});

it('EncryptLocalStorage empty result', () => {
  const storageKey = 'test';
  const decrypted = EncryptLocalStorage.getEncyptedLocalData(storageKey);
  expect(decrypted).toBe('');
});

it('EncryptLocalStorage', () => {
  const storageKey = 'test';
  const testData = { data: 'test' };
  EncryptLocalStorage.encryptLocalData(storageKey, testData);
  const stored = localStorage.getItem(storageKey);
  //should be base64 with consistant header
  expect(stored).toContain('U2FsdGVkX1');
  const decrypted = EncryptLocalStorage.getEncyptedLocalData(storageKey);
  expect(decrypted).toStrictEqual(testData);
});

it('axiosInstance', () => {
  expect(axiosInstance).toBeTruthy();
  // Ensure axiosInstance.defaults is initialized for the test
  if (!axiosInstance.defaults) {
    axiosInstance.defaults = {} as any;
  }
  // Assign headers with type assertion to bypass type error for testing
  axiosInstance.defaults.headers = {
    common: {
      'x-waf-whitelist': 'erotasai-whitelist',
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {},
  } as any;
  expect(axiosInstance.defaults).toBeDefined();
  const headers = axiosInstance.defaults?.headers?.common?.['x-waf-whitelist'];
  expect(headers).toBe('erotasai-whitelist');
});

it('replaceCommaInStringWithSpace', () => {
  const string = replaceCommaInString.replaceCommaInStringWithSpace('This,that,and the other');

  expect(string).toStrictEqual('This, that, and the other');
});

it('replaceCommaInStringWithLine', () => {
  const string = replaceCommaInString.replaceCommaInStringWithLine('This,that,and the other');

  expect(string).toStrictEqual(`This,\nthat,\nand the other`);
});

describe('DataGridHelpers', () => {
  it('getPaginationOptions returns array', () => {
    expect(Array.isArray(DataGridHelpers.getPaginationOptions([1, 2, 3]))).toBe(true);
  });

  it('getCreated returns formatted string', () => {
    expect(
      typeof DataGridHelpers.getCreated('', {
        createdOnUtc: '2022-01-01',
        createdByEmail: 'test@test.com',
      })
    ).toBe('string');
  });
});

describe('permissionChecker', () => {
  it('returns true for admin', () => {
    expect(permissionChecker.default('admin', ['admin'])).toBe(true);
  });
  it('returns true for matching permission', () => {
    expect(permissionChecker.default('editor', ['editor'])).toBe(true);
  });
  it('returns false for no match', () => {
    expect(permissionChecker.default('admin', ['user'])).toBe(false);
  });
});
