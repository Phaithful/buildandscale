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
//   const data = JSON.parse(e.postData.contents);
//
//   // ── Contact form message ──────────────────────────────────────
//   if (data.type === 'contact') {
//     try {
//       MailApp.sendEmail({
//         to:       'buildandscaleint1@gmail.com',
//         subject:  'Contact Form Message — Build & Scale 2026',
//         htmlBody: '<p><strong>From:</strong> ' + data.name + '</p>' +
//                   '<p><strong>Email:</strong> ' + data.email + '</p>' +
//                   '<p><strong>Message:</strong></p>' +
//                   '<p>' + data.message.replace(/\n/g, '<br>') + '</p>',
//         name:     'Build & Scale 2026 Website',
//         replyTo:  data.email,
//       });
//     } catch (err) {
//       Logger.log('Contact email error: ' + err.toString());
//     }
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
//   // ── Reminder emails ───────────────────────────────────────────
//   if (data.type === 'reminder') {
//     const sheet    = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     const rows     = sheet.getDataRange().getValues();
//     const emailCol = rows[0].indexOf('Email');
//     const nameCol  = rows[0].indexOf('Full Name');
//     let sent = 0;
//     rows.slice(1).forEach(function(row) {
//       const email     = (row[emailCol] || '').toString().trim();
//       const firstName = ((row[nameCol] || 'Attendee').toString().split(' '))[0];
//       if (!email) return;
//       const reminderHtml =
//         '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>' +
//         '<body style="margin:0;padding:0;background:#FAF9F6;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">' +
//         '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF9F6;padding:40px 16px;">' +
//         '<tr><td align="center">' +
//         '<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,128,0.10);">' +
//         '<tr><td style="background:#000080;padding:32px 48px 28px;">' +
//         '<img src="https://buildandscale2026.vercel.app/logo.png" alt="Build &amp; Scale 2026" width="160" height="44" style="display:block;border:0;"/>' +
//         '<div style="margin-top:16px;height:1px;background:linear-gradient(90deg,#E6BE8A 0%,rgba(230,190,138,0.1) 100%);"></div>' +
//         '</td></tr>' +
//         '<tr><td style="padding:36px 48px 0;">' +
//         '<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#85754D;">Reminder</p>' +
//         '<p style="margin:0 0 24px;font-family:Georgia,serif;font-size:26px;font-weight:400;color:#000080;line-height:1.25;">' + data.subject + '</p>' +
//         '<p style="margin:0 0 4px;font-size:15px;color:#3a3a5c;">Hi ' + firstName + ',</p>' +
//         '<div style="margin:16px 0 28px;font-size:15px;color:#3a3a5c;line-height:1.75;">' + data.message.replace(/\n/g,'<br>') + '</div>' +
//         '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF9F6;border:1px solid rgba(230,190,138,0.35);border-radius:12px;">' +
//         '<tr><td style="padding:20px 24px;">' +
//         '<p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#85754D;">Event Details</p>' +
//         '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
//         '<tr><td style="padding:4px 0;font-size:11px;font-weight:700;text-transform:uppercase;color:#85754D;width:70px;">Date</td><td style="padding:4px 0;font-size:13px;color:#3a3a5c;"><strong>Saturday, 30th May 2026</strong></td></tr>' +
//         '<tr><td style="padding:4px 0;font-size:11px;font-weight:700;text-transform:uppercase;color:#85754D;">Time</td><td style="padding:4px 0;font-size:13px;color:#3a3a5c;">Registration from <strong>8:00 AM</strong></td></tr>' +
//         '<tr><td style="padding:4px 0;font-size:11px;font-weight:700;text-transform:uppercase;color:#85754D;vertical-align:top;">Venue</td><td style="padding:4px 0;font-size:13px;color:#3a3a5c;">Peter Mbah Law Auditorium<br/>Godfrey Okoye University, Enugu</td></tr>' +
//         '</table></td></tr></table>' +
//         '</td></tr>' +
//         '<tr><td style="padding:28px 48px 36px;">' +
//         '<div style="height:1px;background:rgba(0,0,128,0.08);margin-bottom:24px;"></div>' +
//         '<p style="margin:0 0 4px;font-family:Georgia,serif;font-size:14px;font-weight:600;color:#000080;">Build &amp; Scale 2026</p>' +
//         '<p style="margin:0;font-size:11px;color:#708090;">Convened by Azua Suurshater Stephen &middot; Godfrey Okoye University, Enugu</p>' +
//         '<p style="margin:12px 0 0;font-size:10px;color:#a0aab4;">This is an automated message. Do not reply to this email.</p>' +
//         '</td></tr>' +
//         '</table></td></tr></table></body></html>';
//       try {
//         MailApp.sendEmail({ to: email, subject: data.subject, htmlBody: reminderHtml, name: 'Build & Scale 2026' });
//         sent++;
//       } catch(e) { Logger.log('Reminder error ' + email + ': ' + e); }
//     });
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success', sent: sent }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
//   // ── Registration ──────────────────────────────────────────────
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

//   // ── 0. Reject duplicate emails ────────────────────────────────
//   const rows = sheet.getDataRange().getValues();
//   const existingEmails = rows.slice(1).map(r => (r[2] || '').toString().toLowerCase());
//   if (existingEmails.includes(data.email.toLowerCase())) {
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'duplicate' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }

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
//                       <img src="https://buildandscale2026.vercel.app/logo.png" alt="Build &amp; Scale 2026" width="180" height="50" style="display:block;border:0;" />
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
//                         <td style="padding:5px 0;font-size:13px;color:#3a3a5c;"><strong>Saturday, 30th May 2026</strong></td>
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

export const SHEET_URL = 'https://script.google.com/macros/s/AKfycby-_C-RQ4-oN7UfBlHjZLM9OJ1NhKZJ8CwB0qqeeerKpozSiURaFQ8jPUnVWw0Mr_CYWw/exec'
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

export async function sendReminderEmails({ subject, message }) {
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'reminder', subject, message }),
  });
  return { success: true };
}

export async function submitContactMessage(formData) {
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'contact', ...formData }),
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

// ================================================================
// APPS SCRIPT ADDITIONS — SECONDARY SCHOOL STUDENTS
// ================================================================
// Add the following snippets to your existing Apps Script.
//
// STEP 1 — Change `function doGet()` → `function doGet(e)` and
// prepend this block at the very top of doGet:
//
// function doGet(e) {
//   if (e && e.parameter && e.parameter.type === 'secondary') {
//     const ss = SpreadsheetApp.getActiveSpreadsheet();
//     const sheet2 = ss.getSheetByName('Secondary Students');
//     if (!sheet2) {
//       return ContentService.createTextOutput(JSON.stringify([[]])).setMimeType(ContentService.MimeType.JSON);
//     }
//     const rows = sheet2.getDataRange().getValues();
//     return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
//   }
//   // existing doGet body continues below (getActiveSheet / getDataRange)...
//
// STEP 2 — Add these two handlers at the TOP of doPost, before the
// existing `if (data.type === 'contact')` block:
//
//   // ── Secondary student add ─────────────────────────────────────
//   if (data.type === 'secondary') {
//     const ss = SpreadsheetApp.getActiveSpreadsheet();
//     let sheet2 = ss.getSheetByName('Secondary Students');
//     if (!sheet2) {
//       sheet2 = ss.insertSheet('Secondary Students');
//       sheet2.appendRow(['Timestamp', 'Full Name', 'Class', 'Student ID', 'Checked In']);
//     }
//     sheet2.appendRow([
//       new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
//       data.name,
//       data.secClass,
//       data.studentId,
//       'FALSE',
//     ]);
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
//   // ── Secondary student check-in toggle ─────────────────────────
//   if (data.type === 'secondaryCheckIn') {
//     const ss = SpreadsheetApp.getActiveSpreadsheet();
//     const sheet2 = ss.getSheetByName('Secondary Students');
//     if (sheet2) {
//       const rows = sheet2.getDataRange().getValues();
//       const idCol  = rows[0].indexOf('Student ID');
//       const ciCol  = rows[0].indexOf('Checked In');
//       for (let i = 1; i < rows.length; i++) {
//         if ((rows[i][idCol] || '').toString() === data.studentId) {
//           sheet2.getRange(i + 1, ciCol + 1).setValue(data.checkedIn ? 'TRUE' : 'FALSE');
//           break;
//         }
//       }
//     }
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
// STEP 3 — Redeploy: Deploy → Manage deployments → edit the current
// deployment → Deploy. The URL stays the same.
// ================================================================

export function generateSecStudentId() {
  const t = Date.now().toString(36).slice(-4).toUpperCase();
  const r = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `SEC-${t}-${r}`;
}

export async function submitSecondaryStudent({ name, secClass, studentId }) {
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'secondary', name, secClass, studentId }),
  });
  return { success: true };
}

export async function fetchSecondaryStudents() {
  const response = await fetch(`${SHEET_URL}?type=secondary`);
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) return [];
  const headers = data[0];
  // If the returned headers look like the main sheet (has Email col),
  // the Apps Script hasn't been updated yet — return empty.
  if (!Array.isArray(headers) || !headers.includes('Student ID')) return [];
  return data.slice(1).map((row) =>
    Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']))
  );
}

export async function updateSecondaryCheckIn({ studentId, checkedIn }) {
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'secondaryCheckIn', studentId, checkedIn }),
  });
  return { success: true };
}
