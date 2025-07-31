import { size, uniq } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DEFAULT_PAGE_SIZE } from 'constants/DataGridDefaults';
dayjs.extend(utc);

export const getPaginationOptions = (data: unknown[]) => {
  let options: number[] = [DEFAULT_PAGE_SIZE];
  if (data.length > 0) {
    options = [5, 20, 50, 100, 200, 500, 1000, data.length];
    options.sort((a, b) => a - b);
    options = options.filter((value: number) => data.length >= value);
  }
  return uniq(options);
};

type RowWithCreatedOnUtc = { createdOnUtc: string };

export const getCreatedDate = (value: string, row: RowWithCreatedOnUtc) =>
  `${dayjs.utc(row.createdOnUtc).format('YYYY-MM-DD')}`;
export function getCreated(arg0: string,arg1: {createdOnUtc: string; createdByEmail: string;}) {
  throw new Error('Function not implemented.');
}

