# Peak report → Google Sheet

Every `/peak` form submission is appended as a row to a Google Sheet, in addition
to the Make → Zoho webhook and the sales-inbox email. The website posts to a
Google Apps Script web app (`PEAK_SHEET_WEBHOOK_URL`) with a shared secret
(`PEAK_SHEET_SECRET`). If either env var is unset, the route skips the sheet.

## One-time setup (≈10 minutes)

1. **Create the sheet.** In Google Drive, make a new Google Sheet, e.g.
   "Peak report downloads". Leave it empty; the script writes the header row.
2. **Add the script.** In the sheet: **Extensions → Apps Script**. Delete the
   placeholder code and paste the script below. Save.
3. **Set the secret.** In Apps Script: **Project Settings (gear) → Script
   properties → Add script property**. Property `SECRET`, value: a long random
   string (e.g. from a password generator). Save.
4. **Deploy.** **Deploy → New deployment → type: Web app**.
   - Description: `Peak report webhook`
   - Execute as: **Me**
   - Who has access: **Anyone**. The website calls it without signing in to
     Google; the secret is what stops anyone else from writing rows.

   Click **Deploy**, approve the permissions prompt, and copy the **Web app URL**
   (ends in `/exec`).
5. **Add both values in Netlify.** Site configuration → Environment variables:
   - `PEAK_SHEET_WEBHOOK_URL` = the `/exec` URL
   - `PEAK_SHEET_SECRET` = the same secret as step 3

   Then trigger a redeploy so the new variables take effect.
6. **Test.** Submit the form on `/peak` in a private/incognito window (a browser
   that has already submitted skips the form). A row should appear within a few
   seconds.

If you change the script later, use **Deploy → Manage deployments → Edit →
Version: New version** so the URL stays the same.

## The script

```js
const SHEET_NAME = "Leads";
const COLUMNS = [
  ["submittedAt", "Submitted (UTC)"],
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["email", "Email"],
  ["company", "Company"],
  ["companyWebsite", "Company website"],
  ["weeklyVolume", "Weekly parcel volume"],
  ["marketingOptIn", "Marketing opt-in"],
  ["reportEdition", "Report edition"],
  ["trigger", "Button clicked"],
  ["utmSource", "UTM source"],
  ["utmMedium", "UTM medium"],
  ["utmCampaign", "UTM campaign"],
  ["utmContent", "UTM content"],
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "bad json" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || data.secret !== secret) return reply({ ok: false, error: "unauthorised" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map((c) => c[1]));
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(COLUMNS.map((c) => clean(data[c[0]])));
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

// Stop form input being read as a spreadsheet formula.
function clean(v) {
  const s = v == null ? "" : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## Notes

- The sheet holds personal data (names, work emails). Share it only with the
  people who need it, and treat it like the Zoho leads it duplicates.
- A wrong or missing secret makes the script answer `{"ok":false}`. The website
  still counts that as delivered (HTTP 200), so if rows stop appearing, check
  that the secret in Netlify matches the script property.
- The sheet only gets submissions made after it's set up. Earlier downloads are
  in Zoho (Lead Source "Peak Report") and the sales inbox.
