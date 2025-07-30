import { getGoogleSheet } from './GoogleServiceHelper';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { expect, describe, it } from '@jest/globals';

jest.mock('google-auth-library', () => ({
  JWT: jest.fn(),
}));

jest.mock('google-spreadsheet', () => {
  const mSheet = {
    getRows: jest.fn(),
  };
  const mDoc = {
    loadInfo: jest.fn(),
    sheetsByIndex: [mSheet],
  };
  return {
    GoogleSpreadsheet: jest.fn(() => mDoc),
    GoogleSpreadsheetRow: jest.fn(),
    GoogleSpreadsheetWorksheet: jest.fn(),
  };
});

describe('getGoogleSheet', () => {
  const sheetId = 'test-sheet-id';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@email.com';
    process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID = 'client-id';
    process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID = 'project-id';
    process.env.GOOGLE_SERVICE_KEY_PATH = '/path/to/key.json';
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID = 'key-id';
  });

  it('should fetch rows from the first sheet', async () => {
    const mockRows = [{ row: 1 }, { row: 2 }];
    // @ts-ignore
    GoogleSpreadsheet.mockImplementation(() => ({
      loadInfo: jest.fn(),
      sheetsByIndex: [{ getRows: jest.fn().mockResolvedValue(mockRows) }],
    }));

    const rows = await getGoogleSheet(sheetId);
    expect(GoogleSpreadsheet).toHaveBeenCalledWith(sheetId, expect.any(Object));
    expect(rows).toBe(mockRows);
  });

  it('should initialize JWT with correct params', async () => {
    await getGoogleSheet(sheetId);
    expect(JWT).toHaveBeenCalledWith({
      email: 'test@email.com',
      clientId: 'client-id',
      projectId: 'project-id',
      keyFile: '/path/to/key.json',
      keyId: 'key-id',
      scopes: expect.any(Array),
    });
  });
});
