// var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit#gid=0');
//awhjbawbhdhbawbhahjwdbhjabhjdawdhj
var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');
// const sheetName = Utilities.formatperiod(day, Session.getScriptTimeZone(), "MM/dd/yyyy");

var dayCount = 5;
var periodCount = 5;
var timeSlot = 7;

var monCount = 5;
var tueCount = 7;
var wedCount = 7;
var thurCount = 7;
var friCount = 7;

function submit() {


    var timestamps = [];
    var days = [];
    var emails = [];
    var reasons = [];
    var periods = [];
    var teachers = [];
    // appendCounter++;

    Logger.log("here");

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();//Get the URL of the active spreadsheet and sheet
    var spreadsheetUrl = spreadsheet.getUrl();
    var lastRow = sheet.getLastRow() - 2;


    var x = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
    timestamps.push(x.getValues()); //will get all objects in range from script
    Logger.log(x); //just testing

    emails.push(sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues());
    reasons.push(sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues());
    periods.push(sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues());
    teachers.push(sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getValues());
    days.push(sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues()); //okay so it starts at the 2nd row, then goes all the way down to the 

    Logger.log(lastRow + "wjwjjw"); //just checking it work
    Logger.log(teachers);
    findTeacher(timestamps[0][lastRow], emails[0][lastRow], teachers[0][lastRow], periods[0][lastRow], reasons[0][lastRow], days[0][lastRow]);
}


function findTeacher(timestamp, email, teacher, period, reason, day) {
    Logger.log("hreer");

    var teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
    var teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
    var teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim

    Logger.log(teacher + " are u there?????")

    switch (String(teacher)) {

        case "Ms. Kim":
            teach3.getSheetByName("Ms. Kim").appendRow([timestamp[0], email[0], reason[0],]);
            //we have to find an empty slot
            findPeriod(teach3, period[0]);
            break;
        case "Ms. Dacey":
            teach2.getSheetByName("Ms. Dacey").appendRow([timestamp[0], email[0], reason[0]]);
            findPeriod(teach2, period[0]);
            break;
        case "Ms. Avery":
            Logger.log(timestamp[0], email[0], period[0], reason[0])
            teach1.getSheetByName("Ms. Avery").appendRow([timestamp[0], email[0], reason[0]]);
            findPeriod(teach1, period[0]);
            break;
    }

}

function findDay() {
    switch (day) {
        case "Monday":
            monCount--;
            daysAndPeriods(day, findPeriod());
            break;
        case "Tuesday":
            tueCount--;
            daysAndPeriods(day, findPeriod());
            break;
        case "Wednesday":
            wedCount--;
            daysAndPeriods(day, findPeriod());
            break;
        case "Thursday":
            thurCount--;
            daysAndPeriods(day, findPeriod());
            break;
        case "Friday":
            friCount--;
            daysAndPeriods(day, findPeriod());
            break;
    }

}

function findPeriod(ssx, p) {
    switch (p) {
        case "P1":
            readCells(ssx, 'A3:A9');
            return (1);
        case "P2":
            readCells(ssx, 'A12:A18');
            return (2);
        case "P3":
            readCells(ssx, 'A21:A27');
            return (3);
        case "P4":
            readCells(ssx, 'A30:A36');
            return (4);
        case "P5":
            readCells(ssx, 'A39:A45');
            return (5);
    }
}

function readCells(ssx, range) {

    var sheet = ssx.getActiveSheet();
    var range = sheet.getRange(range);
    var values = range.getValues();

    // for (var i = 0; i < values.length; i++) {
    //     Logger.log("Value in cell A" + (i + 3) + ": " + values[i][0]);

    for (var i = 0; i < values.length; i++) {
        var cellValue = values[i][0];
        var cellAddress = "A" + (i + 3);
        if (cellValue === "" || cellValue === null) {
            Logger.log(cellAddress + " is empty.");
            addRecord(ssx,)
        } else {
            Logger.log(cellAddress + " contains a value: " + cellValue);
        }
    }
    // }
}

function addRecord(ssx, row, column, values) {
    ssx.getActiveSheet().appendRow([timestamp[0], email[0], period[0], reason[0], day[0]]);
}




// var data = ss.getSheetByName("Sheet1");
// data.appendRow([name, period, teacher, new period(), reason]); //dispaly, also add period requested, on the last row available


