function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    
    // Get existing data to check duplicates and count rows
    var lastRow = sheet.getLastRow();
    var userCount = lastRow; // Header row counts as 1, so first user is row 2
    
    var firstName = e.parameter.firstName || "";
    var secondName = e.parameter.secondName || "";
    var birthday = e.parameter.birthday || "";
    var whatsappNumber = e.parameter.whatsappNumber || "";
    var gender = e.parameter.gender || "";
    var country = e.parameter.country || "";
    var channel = e.parameter.channel || "";
    var content = e.parameter.content || "";
    var timestamp = new Date();
    
    // Parse birthday year
    var birthdayYear = "";
    if (birthday) {
      var yearMatch = birthday.match(/^(\d{4})-/);
      if (yearMatch) {
        birthdayYear = yearMatch[1];
      } else {
        // Try alternative format
        var dateObj = new Date(birthday);
        if (!isNaN(dateObj.getTime())) {
          birthdayYear = dateObj.getFullYear().toString();
        }
      }
    }
    
    // Get gender code (M/F)
    var genderCode = "";
    if (gender && gender.length > 0) {
      genderCode = gender.charAt(0).toUpperCase();
    }
    
    // Get channel code (X10/X11/X12)
    var channelCode = "";
    if (channel) {
      if (channel.includes("@x.nor10")) channelCode = "X10";
      else if (channel.includes("@x.nor11")) channelCode = "X11";
      else if (channel.includes("@x.nor12")) channelCode = "X12";
      else channelCode = "X00";
    }
    
    // Generate SESSION_ID
    var sessionId = "";
    var isDuplicate = true;
    var maxAttempts = 10;
    var attempt = 0;
    
    while (isDuplicate && attempt < maxAttempts) {
      // Format: U{User_Count}/{Country}-{BirthYear}:{GenderCode}/{ChannelCode}
      sessionId = `U${userCount}/${country}-${birthdayYear}:${genderCode}/${channelCode}`;
      
      // Check for duplicate SESSION_ID in column A
      isDuplicate = false;
      if (lastRow >= 2) {
        var existingIds = sheet.getRange(2, 1, lastRow-1, 1).getValues().flat();
        for (var i = 0; i < existingIds.length; i++) {
          if (existingIds[i] === sessionId) {
            isDuplicate = true;
            userCount++; // Increment count to try a new ID
            break;
          }
        }
      }
      attempt++;
    }
    
    // If still duplicate after attempts, add timestamp for uniqueness
    if (isDuplicate) {
      var timestampPart = new Date().getTime().toString().slice(-4);
      sessionId = `U${userCount}/${country}-${birthdayYear}:${genderCode}/${channelCode}-${timestampPart}`;
    }
    
    // Append data with SESSION_ID in first column
    sheet.appendRow([
      sessionId, // Column A: SESSION_ID
      firstName, // Column B
      secondName, // Column C
      birthday, // Column D
      whatsappNumber, // Column E
      gender, // Column F
      country, // Column G
      channel, // Column H
      content, // Column I
      timestamp // Column J
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success", 
        message: "Data saved",
        sessionId: sessionId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error", 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to update existing sheet (run once to add headers)
function setupSheetHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  
  // Set headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 10).setValues([[
      "SESSION_ID",
      "First Name",
      "Last Name",
      "Birthday",
      "WhatsApp Number",
      "Gender",
      "Country",
      "Channel",
      "Favorite Content",
      "Timestamp"
    ]]);
    
    // Format header row
    sheet.getRange(1, 1, 1, 10)
      .setBackground("#f8f208")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
  }
}

https://script.google.com/macros/s/AKfycbwYEmceIJyu8W9szeJoZG2iHqgXg-Vb0AHDv7iBpJd6-S4l6nOLzXJNuW6FdT9fHZ0m/exec