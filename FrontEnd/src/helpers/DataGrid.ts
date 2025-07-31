import { size, uniq } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DEFAULT_PAGE_SIZE } from 'constants/DataGridDefaults';
dayjs.extend(utc);

export const getPaginationOptions = (data: any[]) => {
  let options: number[] = [DEFAULT_PAGE_SIZE];
  if (data.length > 0) {
    options = [5, 20, 50, 100, 200, 500, 1000, data.length];
    options.sort((a, b) => a - b);
    options = options.filter((value: number) => data.length >= value);
  }
  return uniq(options);
};

export const getCreated = (value: any, row: any) => `${dayjs.utc(row?.createdOnUtc).format('YYYY-MM-DD')} (${row?.createdByEmail})`;

export const getCreatedDate = (value: any, row: any) => `${dayjs.utc(row?.createdOnUtc).format('YYYY-MM-DD')}`;

export const getDefinitionCreated = (value: any, row: any) => {
  if (row?.definitionUpdatedOnUtc) {
    return `${dayjs.utc(row?.definitionUpdatedOnUtc).format('YYYY-MM-DD')} (${row?.definitionUpdatedByEmail})`;
  } else {
    return '';
  }
};

export const getDeprecatedDate = (value: any, row: any) => {
  if (row?.deprecatedOnUtc) {
    return `${dayjs.utc(row?.deprecatedOnUtc).format('YYYY-MM-DD')}`;
  } else {
    return '';
  }
};

export const getDeprecated = (value: any, row: any) => {
  if (size(row?.deprecatedOnUtc) > 0 && size(row?.deprecatedByEmail) > 0) {
    return `${dayjs.utc(row?.deprecatedOnUtc).format('YYYY-MM-DD')} (${row?.deprecatedByEmail})`;
  } else {
    return '';
  }
};

export const getAccount = (value: any, row: any) => {
  if (row?.accountId && row?.accountCode) {
    return `${row?.accountCode} (${row?.accountId})`;
  } else {
    return 'ALL';
  }
};

export const getAccountName = (value: any, row: any) => {
  if (row?.accountCode && row?.accountName) {
    return `${row?.accountCode} (${row?.accountName})`;
  } else {
    return row?.accountCode;
  }
};

export const getPersonName = (value: any, row: any) => `${row?.personTypeName} (${row?.personTypeId})`;

export const getProductName = (value: any, row: any) => `${row?.productName} (${row?.productId}) | ${row?.defaultProductName}`;

export const getProductSection = (value: any, row: any) => `${row?.productSectionName} (${row?.productSectionId})`;

export const getProductSectionWithDefault = (value: any, row: any) =>
  `${row?.productSectionName} (${row?.productSectionId}) | ${row?.defaultProductsectionName}`;

export const getExternalProductsection = (value: any, row: any) =>
  `${row?.externalProductsection} ${row?.externalProductsectionId === null ? '' : `(${row?.externalProductsectionId})`}`;

export const getExternalProduct = (value: any, row: any) =>
  `${row?.externalProduct} ${row?.externalProductId === null ? '' : `(${row?.externalProductId})`}`;

export const getSubsidary = (value: any, row: any) => `${row?.clientCode} (${row?.clientId})`;
