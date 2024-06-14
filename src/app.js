/*A program that manages input and output from google's apps (forms, spreadsheets). An algorithm distributes different inputs by different timeslots, and properly formats the output. 
*/
const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');
const MailApp = GmailApp;
// const sheetName = Utilities.formatperiod(day, Session.getScriptTimeZone(), "MM/dd/yyyy");
const teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
const teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
const teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim

function submit() {
    checkRun();
    var timestamps = [];
    var days = [];
    var emails = [];
    var reasons = [];
    var periods = [];
    var teachers = [];

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
    // days.push(sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues()); //okay so it starts at the 2nd row, then goes all the way down to the 

    Logger.log(lastRow + " fetched"); //just checking it work
    Logger.log(periods);
    findTeacher(timestamps[0][lastRow], emails[0][lastRow], teachers[0][lastRow], periods[0][lastRow], reasons[0][lastRow]);
}


function findTeacher(timestamp, email, teacher, period, reason) {
    Logger.log("hreer");



    Logger.log(teacher + " are u there?????")
    var values = [[timestamp[0], email[0], reason[0]]] //google app script requires you to pass values into sheets with a 2D array, rows and cols, even if youre just using one row

    switch (String(teacher)) {

        case "Ms. Kim":
            //we have to find an empty slot
            Logger.log(period + "wwjjwj");
            Logger.log(period[0] + "so why did this work");
            findPeriod(teach3, period[0], values);
            break;
        case "Ms. Dacey":
            findPeriod(teach2, period[0], values);
            break;
        case "Ms. Avery":
            Logger.log(timestamp, email, period, reason);
            findPeriod(teach1, period[0], values);
            break;
    }


}


function findPeriod(ssx, p, values) {
    Logger.log(p);
    switch (p) {
        case "P1":
            Logger.log(findDayOfWeek(values[0][0]) + " day of the week in the findPeriod function");
            if (readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).success) { //wanna check availabiloty of the period in that specific day
                Logger.log("found it here");
                addRecord(ssx, readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).num, 2, values, findDayOfWeek(values[0][0]));
            }
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                repeatSearch(findDayOfWeek(values[0][0]), 'B3:B9', ssx, 3, values);
            }
            break;
        case "P2":
            if (readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                repeatSearch(findDayOfWeek(values[0][0]), 'B12:B18', ssx, 12, values);
            }
            break;
        case "P3":
            Logger.log("are you here RIGHT NOW ARE YOU HERE");
            if (readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                repeatSearch(findDayOfWeek(values[0][0]), 'B21:B27', ssx, 21, values);
            }
            break;
        case "P4":
            if (readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                repeatSearch(findDayOfWeek(values[0][0]), 'B30:B36', ssx, 30, values);
            }
            break;
        case "P5":
            if (readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                repeatSearch(findDayOfWeek(values[0][0]), 'B39:B45', ssx, 39, values);
            }
            break;
        default:
            Logger.log("Could not access specified period");
    }
}

function findDayOfWeek(values) {
    var dayOfWeek = values.getDay();
    Logger.log(dayOfWeek + " day of wwek?");
    switch (parseInt(dayOfWeek)) {
        //these are all moved up by 1 value, to ensure that students do not get appoitned on a date earlier than their submission.
        case 0: //meaning, they submitted the form on Sunday
            return "Monday"
        case 1: //submitted on monday, etc...
            return "Tuesday";
        case 2:
            return "Wednesday";
        case 3:
            return "Thursday";
        case 4:
            return "Friday";
        case 5: //submitted friday, moved to monday
            return "Monday";
        case 6:
            return "Monday";
    }
}



function repeatSearch(weekDay, range, ssx, row, values) { //we'll just search through it again, until we've checked all days until the end.
    switch (weekDay) {
        case "Monday": //they searched for monday, and it was unavailable, meaning they have to search for 4 more days
            for (var i = 1; i < 5; i++) {
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }
            }
            break;
        case "Tuesday":
            for (var i = 2; i < 5; i++) {
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(values)).val, 2, values, findDayOfWeek(values));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }
            }
            break;
        case "Wednesday":
            for (var i = 3; i < 5; i++) {
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(i)).val, 2, values, findDayOfWeek(i));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }

            }
            break;
        case "Thursday":
            for (var i = 4; i < 5; i++) {
                Logger.log(findDayOfWeek(4.0));
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(i)).val, 2, values, findDayOfWeek(i));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }

            }
            break;
        case "Friday":
            return "Please submit another response starting the following week.";
        case "Monday":
            return "Please submit another response starting the following week.";
        case "Monday":
            return "Please submit another response starting the following week."
    }

}

function readCells(ssx, range, num, weekDay) {
    Logger.log(weekDay);
    var data = ssx.getSheetByName(weekDay).getRange(range);
    var values = data.getValues();

    for (var i = 0; i < values.length; i++) {
        var cellValue = values[i][0];
        var cellAddress = "B" + (i + num);
        if (cellValue === "" || cellValue === null) {
            Logger.log(cellAddress + " is empty.");
            Logger.log(num + " number");
            return {
                val: (i + num), success: true
            };
        } else {
            Logger.log(cellAddress + " contains a value: " + cellValue);
        }
    }
    Logger.log("All cells are full, I must move to the 2nd next day.")

    return { val: null, success: false };
}

function addRecord(ssx, row, column, values, dayOfWeek) {
    let sheet = ssx.getSheetByName(dayOfWeek);
    sheet.getRange(row, column, values.length, values[0].length).setValues(values);
    autoEmail(values[0][1], 'Guidance Appointment Confirmation', 'Your request has been logged in our waitlist. Please await a confirmation email within the following day.');
}

function autoEmail(email, subject, body) {
    Logger.log(email);
    try {
        MailApp.sendEmail(email, subject, body);

        Logger.log("Successfully sent email")

    } catch (Exception) {
        Logger.log("email failed to send: " + Exception.message);
    }
}


function runAdd() {
    createSheets(teach1);
    createSheets(teach2);
    createSheets(teach3);
}
//automatic creating and deletion of week day sheets:
function createSheets(ssx) {
    var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    Logger.log("Deleting and replacing");
    // deletion process, if same name found, delete it.
    weekdays.forEach(function (day) { //beautiful for each
        var s = ssx.getSheetByName(day);
        if (s) {
            ssx.deleteSheet(s); //if it finds the same name
        }
    });

    //now that its ensured that the previous ones are gone, make a new batch

    const rangeToCopy = ssx.getSheetByName("Template").getDataRange();
    weekdays.forEach(function (day) {
        const newSheet = ssx.insertSheet(day);
        Logger.log("It should have made a new one by now");
        rangeToCopy.copyTo(newSheet.getRange(1, 1));
    });

}

function checkRun() {
    confirmCheck(teach1,);
    confirmCheck(teach1, 12);
    confirmCheck(teach1, 21);
    confirmCheck(teach1, 30);
    confirmCheck(teach1, 39);
    confirmCheck(teach2, 3);
    confirmCheck(teach2, 12);
    confirmCheck(teach2, 21);
    confirmCheck(teach2, 30);
    confirmCheck(teach2, 39);
    confirmCheck(teach3, 3);
    confirmCheck(teach3, 12);
    confirmCheck(teach3, 21);
    confirmCheck(teach3, 30);
    confirmCheck(teach3, 39);
}

function confirmCheck(ssx, range) { //because I dont have the program working across multiple days, I unfortunately won't need to inform the user of their day of week
    var emails = ssx.getActiveSheet().getRange(range).getValues();
    var times = ssx.getActiveSheet().getRange(range).getValues();
    var checks = ssx.getActiveSheet().getRange(range).getValues();
    Logger.log(checks);
    for (var i = 0; i < 7; i++) {
        Logger.log(i);
        Logger.log(emails[0][i] + 'email');
        Logger.log(checks[0][i] + " hi");
        if (checks[0][i]) {
            autoEmail(emails[0][i], "Confirmed", "Your time is at: " + times[0][i]);
        }
    }



}
