function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0]; // Better sheet selection

    var firstName = e.parameter.firstName || "";
    var secondName = e.parameter.secondName || "";
    var birthday = e.parameter.birthday || "";
    var whatsappNumber = e.parameter.whatsappNumber || "";
    var gender = e.parameter.gender || "";
    var country = e.parameter.country || "";
    var channel = e.parameter.channel || "";
    var content = e.parameter.content || "";
    var timestamp = new Date();

    sheet.appendRow([
      firstName,
      secondName,
      birthday,
      whatsappNumber,
      gender,
      country,
      channel,
      content,
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({status: "success", message: "Data saved"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}