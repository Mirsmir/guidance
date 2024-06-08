// var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit#gid=0');

var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');
// const sheetName = Utilities.formatDate(day, Session.getScriptTimeZone(), "MM/dd/yyyy");

var timestamp = [];
var email = [];
var reason = [];
var date = [];
var teacher = [];

function accessemailheet() { //this is really time consuming and stupid, doing it for the crispy UI
    var lastRow = ss.getLastRow();
    var sheet = ss.getSheetByName('Sheet1');
    var cols = sheet.getRange(2, 2, lastRow); //present in column B (row to start, column to start, column to stop at)
    var colsValue = cols.getValues();
    for (var i = 0; i < colsValue.length; i++) {
        if (colsValue[i][0]) {
            Logger.log(colsValue + " im the alpha");
            email.push(colsValue[i][0])
        }
    }
    return (email);
}

function submit() {
    // appendCounter++;

    Logger.log("here");

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    // Get the URL of the active spreadsheet
    var spreadsheetUrl = spreadsheet.getUrl();

    // var something = SpreadsheetApp.getActiveSheet();

    // var sheet = SpreadsheetApp.openById('1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE'); //will redirect to the link of the form 
    var x = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
    timestamp.push(x.getValues()); //will get all objects in range from script
    Logger.log(x);
    email.push(sheet.getRange(2, 2, sheet.getLastRow(), 1).getValues());
    reason.push(sheet.getRange(2, 4, sheet.getLastRow(), 1).getValues());
    date.push(sheet.getRange(2, 3, sheet.getLastRow(), 1).getValues());
    teacher.push(sheet.getRange(2, 5, sheet.getLastRow(), 1).getValues());

    // var count = responses.length; //the length responses
    // var latestResp = timestamp.length - 1; //last response
    // var questionItems = latestResp.getItemResponses();
    // array[0].push(accessemailsheet());

    // for (var i = 0; i < 5; i++) {

    // var questionItem = questionItems[i];
    // var prompt = questionItem.getItem().getTitle(); //the title of the question in the google form
    // var ans = questionItem.getResponse();
    Logger.log(timestamp, " ", email, " ", teacher); //just checking it work
    // Logger.log(ans);
    // array.push(ans); //now actually updating array that wil update the google sheet
    // }
    AddRecord(timestamp[timestamp.length - 1], email[email.length - 1], teacher[teacher.length - 1], date[date.length - 1], reason[reason.length - 1]);
    // var length = array.length;
}

function AddRecord(timestamp, email, teacher, date, reason) {

    var teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
    var teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
    var teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim

    Logger.log(teacher + " are u there?????")
    ss.getSheetByName('Sheet1').appendRow([teacher]);
    switch (teacher) {
        case "Ms. Kim":
            teach3.getSheetByName("Ms. Kim").appendRow([timestamp, email, date, reason]);
            break;
        case "Ms. Dacey":
            teach2.getSheetByName("Ms. Dacey").appendRow([timestamp, email, date, reason]);
            break;
        case "Ms. Avery":
            teach1.getSheetByName("Ms. Avery").appendRow([timestamp, email, date, reason]);
            break;
    }

}
function highlightLate() {


}


// var data = ss.getSheetByName("Sheet1");
// data.appendRow([name, date, teacher, new Date(), reason]); //dispaly, also add date requested, on the last row available



