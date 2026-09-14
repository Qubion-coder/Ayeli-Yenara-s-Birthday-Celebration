const SPREADSHEET_ID = '13DjexVp2LztgDKhITrWH0fhc1VNxB8aM8FRkcBzBjac';
const SHEET_NAME = 'RSVPs';

function doPost(e) {
  try {
    let data;
    try {
      // Parse the incoming JSON data from the request body
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid JSON Payload" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Open the specific Google Sheet using its ID
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If the sheet doesn't exist, auto-create it and add headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = ['Timestamp', 'Guest Name', 'Attending', 'Adults Count', 'Kids Count', 'Special Note'];
      sheet.appendRow(headers);
      
      // Optional: Style the headers to make them look nice
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3e8ff");
      sheet.setFrozenRows(1);
    }

    // Prepare the row data
    const rowData = [
      new Date(),
      data.guestName || 'Unknown',
      data.attending ? 'Yes' : 'No',
      data.adultsCount || 0,
      data.kidsCount || 0,
      data.specialNote || ''
    ];

    // Append the new RSVP to the bottom of the sheet
    sheet.appendRow(rowData);

    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error if something goes wrong
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
