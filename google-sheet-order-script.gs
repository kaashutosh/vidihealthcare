// 1) Open the Google Sheet you want to store orders in
// 2) Click Extensions > Apps Script
// 3) Paste this script and save
// 4) Replace SPREADSHEET_ID below with the sheet ID
// 5) Click Deploy > New deployment
// 6) Select Web app
// 7) Set who has access to "Anyone"
// 8) Copy the web app URL and paste it into assets/js/order-form.js

const SPREADSHEET_ID = 'Sheet1';

function doGet() {
  return ContentService.createTextOutput('Order form endpoint is ready.');
}

function doPost(e) {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'Sheet1') {
      throw new Error('Please add your Google Sheet ID to SPREADSHEET_ID in the Apps Script file.');
    }

    let payload = {};
    const contentType = (e && e.postData && e.postData.type) || '';

    if (e && e.postData && e.postData.contents) {
      const raw = e.postData.contents;

      if (contentType.indexOf('application/json') !== -1) {
        try {
          payload = JSON.parse(raw);
        } catch (_) {
          payload = {};
        }
      } else {
        const params = e.parameter || {};
        Object.keys(params).forEach(function (key) {
          payload[key] = params[key];
        });

        if (Object.keys(payload).length === 0 && raw) {
          const urlParams = raw.split('&');
          urlParams.forEach(function (pair) {
            if (!pair) return;
            const parts = pair.split('=');
            const key = decodeURIComponent(parts[0]);
            const value = decodeURIComponent(parts.slice(1).join('=') || '');
            payload[key] = value;
          });
        }
      }
    }

    if (!payload || Object.keys(payload).length === 0) {
      payload = e && e.parameter ? e.parameter : {};
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('Orders');

    if (!sheet) {
      sheet = spreadsheet.insertSheet('Orders');
      sheet.appendRow([
        'Submitted At',
        'Product',
        'Full Name',
        'Phone',
        'Email',
        'Quantity',
        'City',
        'Address',
        'Notes'
      ]);
    }

    const row = [
      new Date(),
      payload.product || '',
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      payload.quantity || '',
      payload.city || '',
      payload.address || '',
      payload.notes || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Order saved successfully.'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
