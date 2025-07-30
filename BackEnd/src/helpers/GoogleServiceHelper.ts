import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  // 'https://www.googleapis.com/auth/spreadsheets.readonly',
  // 'https://www.googleapis.com/auth/drive.readonly',
];

export const getGoogleSheet = async (
  sheetId: string,
): Promise<GoogleSpreadsheetRow<Record<string, any>>[]> => {
  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    clientId: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    projectId: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    keyFile: process.env.GOOGLE_SERVICE_KEY_PATH,
    keyId: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID,
    scopes: SCOPES,
  });
  const doc = new GoogleSpreadsheet(sheetId, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  const rows = await sheet.getRows();
  return rows;
};

export default getGoogleSheet;
