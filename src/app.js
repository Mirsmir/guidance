// var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit#gid=0');
//awhjbawbhdhbawbhahjwdbhjabhjdawdhj
var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');
// const sheetName = Utilities.formatDate(day, Session.getScriptTimeZone(), "MM/dd/yyyy");

var timestamps = [];
var emails = [];
var reasons = [];
var dates = [];
var teachers = [];

function submit() {
    // appendCounter++;

    Logger.log("here");

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();//Get the URL of the active spreadsheet and sheet
    var spreadsheetUrl = spreadsheet.getUrl();

    var x = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
    timestamps.push(x.getValues()); //will get all objects in range from script
    Logger.log(x);
    emails.push(sheet.getRange(2, 2, sheet.getLastRow(), 1).getValues());
    reasons.push(sheet.getRange(2, 4, sheet.getLastRow(), 1).getValues());
    dates.push(sheet.getRange(2, 3, sheet.getLastRow(), 1).getValues());
    teachers.push(sheet.getRange(2, 5, sheet.getLastRow(), 1).getValues());

    Logger.log(teachers); //just checking it work

    AddRecord(timestamps[timestamps.length - 1][0], emails[emails.length - 1][0], teachers[teachers.length - 1][0], dates[dates.length - 1][0], reasons[reasons.length - 1][0]);
}

function AddRecord(timestamp, email, teacher, date, reason) {
    Logger.log("hreer");

    var teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
    var teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
    var teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim

    Logger.log("Normalized teacher: " + teacher);

    Logger.log(teacher + " are u there?????")
    // teach1.getSheetByName('Ms. Avery').appendRow(teacher);
    switch (String(teacher)) {
        case "Ms. Kim":
            Logger.log("heelllo!!!!");
            teach3.getSheetByName("Ms. Kim").appendRow(timestamp, email, date, reason);
            break;
        case "Ms. Dacey":
            teach2.getSheetByName("Ms. Dacey").appendRow(timestamp, email, date, reason);
            break;
        case "Ms. Avery":
            teach1.getSheetByName("Ms. Avery").appendRow(timestamp, email, date, reason);
            break;
    }

}
function highlightLate() {


}


// var data = ss.getSheetByName("Sheet1");
// data.appendRow([name, date, teacher, new Date(), reason]); //dispaly, also add date requested, on the last row available



