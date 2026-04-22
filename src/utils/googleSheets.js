// ============================================================
// Google Sheets Integration
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Create a Google Sheet with these columns in Row 1:
//    Timestamp | Full Name | Email | Phone | Institution | Level | Referral
// 2. Go to Extensions → Apps Script → paste the Web App script below
// 3. Deploy as Web App (Execute as: Me, Access: Anyone)
// 4. Copy the Web App URL and paste it as SHEET_URL below
//
// Apps Script code to paste:
// -----------------------------------------------
// function doPost(e) {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const data = JSON.parse(e.postData.contents);
//   sheet.appendRow([
//     new Date().toLocaleString(),
//     data.fullName, data.email, data.phone,
//     data.institution, data.level, data.referral
//   ]);
//   return ContentService
//     .createTextOutput(JSON.stringify({ result: 'success' }))
//     .setMimeType(ContentService.MimeType.JSON);
// }
// function doGet() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const rows = sheet.getDataRange().getValues();
//   return ContentService
//     .createTextOutput(JSON.stringify(rows))
//     .setMimeType(ContentService.MimeType.JSON);
// }
// -----------------------------------------------

export const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

export async function submitRegistration(formData) {
  const response = await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  // no-cors returns opaque response — assume success if no error thrown
  return { success: true };
}

export async function fetchRegistrations() {
  const response = await fetch(SHEET_URL, { method: 'GET' });
  const data = await response.json();
  // data[0] is headers, rest are rows
  const headers = data[0];
  return data.slice(1).map((row) =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
}
