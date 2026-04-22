// ============================================================
// Google Sheets Integration
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Google Sheet columns (Row 1 headers):
//    Timestamp | Full Name | Email | Phone | Institution | Level | Referral | Registration ID
//    (Add "Registration ID" manually in cell H1)
//
// 2. Go to Extensions → Apps Script → DELETE all existing code
//    and paste the script below, then create a NEW deployment:
//    Deploy → New deployment (NOT "Manage deployments")
//    Execute as: Me | Access: Anyone
//    Click Authorize → grant Mail permission when prompted
//
// 3. Copy the new Web App URL and paste it as SHEET_URL below.
//
// ================================================================
// APPS SCRIPT — FULL SCRIPT (copy-paste ready)
// ================================================================
//
// function doPost(e) {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const data  = JSON.parse(e.postData.contents);

//   // ── 1. Save to sheet ─────────────────────────────────────────
//   sheet.appendRow([
//     new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
//     data.fullName,
//     data.email,
//     data.phone,
//     data.institution,
//     data.level,
//     data.referral,
//     data.regId,
//   ]);

//   // ── 2. Build QR code URL ──────────────────────────────────────
//   const qrData = encodeURIComponent(
//     'https://buildandscale2026.vercel.app/verify?id=' + data.regId
//   );
//   const qrUrl =
//     'https://api.qrserver.com/v1/create-qr-code/?data=' + qrData +
//     '&size=280x280&bgcolor=FAF9F6&color=000080&margin=10';

//   // ── 3. Build HTML email ───────────────────────────────────────
//   const firstName = data.fullName.split(' ')[0];

//   const htmlBody = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Build &amp; Scale 2026 — Registration Confirmed</title>
// </head>
// <body style="margin:0;padding:0;background:#FAF9F6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF9F6;padding:40px 16px;">
//     <tr>
//       <td align="center">
//         <table width="600" cellpadding="0" cellspacing="0" border="0"
//                style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;
//                       overflow:hidden;box-shadow:0 8px 40px rgba(0,0,128,0.10);">

//           <!-- HEADER -->
//           <tr>
//             <td style="background:#000080;padding:40px 48px 36px;">
//               <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td>
//                     <div style="display:inline-block;background:rgba(230,190,138,0.15);
//                                 border:1px solid rgba(230,190,138,0.30);border-radius:8px;
//                                 padding:8px 16px;">
//                       <span style="font-family:Georgia,serif;font-size:18px;font-weight:600;
//                                    color:#E6BE8A;letter-spacing:0.08em;">B&amp;S</span>
//                     </div>
//                   </td>
//                   <td align="right">
//                     <span style="font-family:Georgia,serif;font-size:11px;
//                                  color:rgba(230,190,138,0.6);letter-spacing:0.2em;
//                                  text-transform:uppercase;">2026</span>
//                   </td>
//                 </tr>
//               </table>
//               <p style="margin:28px 0 4px;font-family:Georgia,serif;font-size:38px;
//                          font-weight:400;color:#ffffff;letter-spacing:-0.01em;line-height:1.15;">
//                 You&rsquo;re In.
//               </p>
//               <p style="margin:0;font-family:Georgia,serif;font-size:18px;
//                          font-style:italic;color:#E6BE8A;">
//                 Welcome, ${firstName}.
//               </p>
//               <div style="margin-top:28px;height:1px;
//                            background:linear-gradient(90deg,#E6BE8A 0%,rgba(230,190,138,0.1) 100%);"></div>
//             </td>
//           </tr>

//           <!-- BODY -->
//           <tr>
//             <td style="padding:40px 48px 0;">
//               <p style="margin:0 0 28px;font-size:15px;color:#3a3a5c;line-height:1.75;">
//                 Your seat at <strong style="color:#000080;">Build &amp; Scale 2026</strong>
//                 is officially confirmed. Present the QR code below at the entrance on the
//                 day of the event for seamless check-in.
//               </p>

//               <!-- QR Block -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td align="center"
//                       style="background:#FAF9F6;border:1px solid rgba(0,0,128,0.10);
//                              border-radius:12px;padding:32px 24px;">
//                     <p style="margin:0 0 20px;font-size:10px;font-weight:700;
//                                letter-spacing:0.2em;text-transform:uppercase;color:#85754D;">
//                       Your Entry QR Code
//                     </p>
//                     <img src="${qrUrl}" alt="Entry QR Code" width="200" height="200"
//                          style="display:block;border-radius:8px;border:3px solid rgba(0,0,128,0.10);" />
//                     <p style="margin:20px 0 0;font-family:'Courier New',Courier,monospace;
//                                font-size:13px;font-weight:700;color:#000080;letter-spacing:0.12em;">
//                       ${data.regId}
//                     </p>
//                     <p style="margin:6px 0 0;font-size:11px;color:#708090;">
//                       Screenshot or print this email for entry
//                     </p>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Attendee Details -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0"
//                      style="margin-top:28px;border:1px solid rgba(0,0,128,0.08);
//                             border-radius:12px;overflow:hidden;">
//                 <tr>
//                   <td style="background:#000080;padding:12px 24px;">
//                     <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;
//                                  text-transform:uppercase;color:#E6BE8A;">Attendee Details</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding:20px 24px;">
//                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                       <tr>
//                         <td style="padding:6px 0;font-size:12px;color:#708090;width:140px;vertical-align:top;">Full Name</td>
//                         <td style="padding:6px 0;font-size:14px;color:#0a0a2e;font-weight:500;">${data.fullName}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding:6px 0;font-size:12px;color:#708090;vertical-align:top;">Email</td>
//                         <td style="padding:6px 0;font-size:14px;color:#0a0a2e;">${data.email}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding:6px 0;font-size:12px;color:#708090;vertical-align:top;">Phone</td>
//                         <td style="padding:6px 0;font-size:14px;color:#0a0a2e;">${data.phone}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding:6px 0;font-size:12px;color:#708090;vertical-align:top;">Institution</td>
//                         <td style="padding:6px 0;font-size:14px;color:#0a0a2e;">${data.institution}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding:6px 0;font-size:12px;color:#708090;vertical-align:top;">Level</td>
//                         <td style="padding:6px 0;font-size:14px;color:#0a0a2e;">${data.level}</td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Event Details -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0"
//                      style="margin-top:20px;background:#FAF9F6;
//                             border:1px solid rgba(230,190,138,0.35);border-radius:12px;">
//                 <tr>
//                   <td style="padding:24px;">
//                     <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.18em;
//                                text-transform:uppercase;color:#85754D;">Event Details</p>
//                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                       <tr>
//                         <td style="padding:5px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#85754D;width:80px;vertical-align:top;">Date</td>
//                         <td style="padding:5px 0;font-size:13px;color:#3a3a5c;"><strong>Friday, 30th May 2026</strong></td>
//                       </tr>
//                       <tr>
//                         <td style="padding:5px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#85754D;vertical-align:top;">Time</td>
//                         <td style="padding:5px 0;font-size:13px;color:#3a3a5c;">Registration from <strong>8:00 AM</strong></td>
//                       </tr>
//                       <tr>
//                         <td style="padding:5px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#85754D;vertical-align:top;">Venue</td>
//                         <td style="padding:5px 0;font-size:13px;color:#3a3a5c;">Peter Mbah Law Auditorium<br/>Godfrey Okoye University, Enugu</td>
//                       </tr>
//                       <tr>
//                         <td style="padding:5px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#85754D;vertical-align:top;">Entry</td>
//                         <td style="padding:5px 0;font-size:13px;color:#3a3a5c;"><strong>Free</strong> &mdash; QR code required at the door</td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- FOOTER -->
//           <tr>
//             <td style="padding:36px 48px 40px;">
//               <div style="height:1px;background:rgba(0,0,128,0.08);margin-bottom:28px;"></div>
//               <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:15px;
//                          font-weight:600;color:#000080;">Build &amp; Scale 2026</p>
//               <p style="margin:0;font-size:12px;color:#708090;line-height:1.6;">
//                 Convened by Azua Suurshater Stephen &middot; Godfrey Okoye University, Enugu
//               </p>
//               <p style="margin:16px 0 0;font-size:11px;color:#a0aab4;">
//                 This is an automated confirmation. Do not reply to this email.
//               </p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>`;

//   // ── 4. Send email (non-fatal if quota exceeded) ───────────────
//   try {
//     MailApp.sendEmail({
//       to:       data.email,
//       subject:  "You're registered — Build & Scale 2026 · Your Entry QR Code",
//       htmlBody: htmlBody,
//       name:     'Build & Scale 2026',
//     });
//   } catch (mailErr) {
//     Logger.log('MailApp error: ' + mailErr.toString());
//   }

//   return ContentService
//     .createTextOutput(JSON.stringify({ result: 'success', regId: data.regId }))
//     .setMimeType(ContentService.MimeType.JSON);
// }

// function doGet() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const rows  = sheet.getDataRange().getValues();
//   return ContentService
//     .createTextOutput(JSON.stringify(rows))
//     .setMimeType(ContentService.MimeType.JSON);
// }
// ================================================================

export const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyGtQ0EbkaXcEsOkvfRl6-F2MIIVNHWlufVQzxOZ_K6P-1Xjs0C5H5LpFokOnXrew74Nw/exec'
/**
 * Generates a unique registration ID.
 * Format: BS2026-XXXX-YYYY  (e.g. BS2026-LXK4-F9J2)
 */
export function generateRegId() {
  const timePart   = Date.now().toString(36).slice(-4).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BS2026-${timePart}-${randomPart}`;
}

export async function submitRegistration(formData) {
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData), // formData now includes regId
  });
  return { success: true };
}

export async function fetchRegistrations() {
  const response = await fetch(SHEET_URL, { method: 'GET' });
  const data = await response.json();
  const headers = data[0];
  return data.slice(1).map((row) =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
}
