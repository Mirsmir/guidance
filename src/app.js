/* eslint-disable @typescript-eslint/no-unused-vars */


/*A program that manages input and output from google's apps (forms, spreadsheets). 
An algorithm distributes different inputs by different timeslots, and properly formats the output. 
It manages automatic emails for reminders and updates. OKAY AM I HERE
@date 11 June 2024
@author Rachel Smirnov
@version 1.0

*/





const data = [];
const timestamps = [];
const emails = [];
const reasons = [];
const periods = [];
const teachers = [];

// eslint-disable-next-line no-undef
const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');
// eslint-disable-next-line no-undef
const MailApp = GmailApp;
// const sheetName = Utilities.formatperiod(day, Session.getScriptTimeZone(), "MM/dd/yyyy");
// eslint-disable-next-line no-undef
const teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
// eslint-disable-next-line no-undef
const teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
// eslint-disable-next-line no-undef
const teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim




/*
Method is called on submission trigger of the google form app. Manages creation and reading of results file.
@params: n/a
@pre: n/aw
@post: 4 arrays with corresponding values from the google form, runs the findteacher function that triggers the distribution 
*/
function doPost(e) {

    var data = JSON.parse(e.postData.contents);  // Parse incoming JSON data

    // Set CORS headers to allow cross-origin requests
    var response = ContentService.createTextOutput(
        JSON.stringify({ message: "Data received successfully", receivedData: data })
    );

    // Set CORS headers to allow requests from any origin
    response.setMimeType(ContentService.MimeType.JSON);
    response.setHeaders({
        'Access-Control-Allow-Origin': '*',  // Allow all origins (can be restricted for security)
        'Access-Control-Allow-Methods': 'POST, OPTIONS',  // Allow POST and OPTIONS methods
        'Access-Control-Allow-Headers': 'Content-Type',  // Allow Content-Type header
    });

    return response;
}

/*
Method is called on submission trigger of the google form app. Manages creation and reading of results file.
@params: n/a
@pre: n/a
@post: 4 arrays with corresponding values from the google form, runs the findteacher function that triggers the distribution 
*/
function submit() {

    console.log("here");

    // eslint-disable-next-line no-undef
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();//Get the URL of the active spreadsheet and sheet
    var spreadsheetUrl = spreadsheet.getUrl();
    var lastRow = sheet.getLastRow() - 2;


    var x = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
    timestamps.push(x.getValues()); //will get all objects in range from script
    console.log(x); //just testing

    emails.push(sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues()); //what the hell does this
    reasons.push(sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues());
    periods.push(sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues());
    teachers.push(sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getValues());
    // days.push(sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues()); //okay so it starts at the 2nd row, then goes all the way down to the 

    console.log(lastRow + " fetched"); //just checking it work
    console.log(periods);
    findTeacher(timestamps[0][lastRow], emails[0][lastRow], teachers[0][lastRow], periods[0][lastRow], reasons[0][lastRow]);
}

/*
Finds correpsonding teacher, triggers findperiod
@params: arrays from submit function
@pre: must have arrays with all vals
@post: call findPeriod function
*/
function findTeacher(timestamp, email, teacher, period, reason) {
    console.log("hreer");



    console.log(teacher + " are u there?????")
    var values = [[timestamp[0], email[0], reason[0], period[0]]] //google app script requires you to pass values into sheets with a 2D array, rows and cols, even if youre just using one row

    switch (String(teacher)) {

        case "Ms. Kim":
            //we have to find an empty slot
            console.log(period + "wwjjwj");
            console.log(period[0] + "so why did this work");
            findPeriod(teach3, values);
            break;
        case "Ms. Dacey":
            findPeriod(teach2, values);
            break;
        case "Ms. Avery":
            console.log(timestamp, email, period, reason);
            findPeriod(teach1, values);
            break;
    }


}

/*
finds the period that the student requested, read the cells and calls reading for available cell.
@params: sheet to search,  values
@pre: n/a
@post: will run the add record function if applicable, otherwise will autimatically email of the unavailability during that week
@placeholder in future versions, unavailibility will ty to get resolved with repeated searches through the remaining days of the week.
*/
function findPeriod(ssx, values) {
    console.log(values[0][3]);
    switch (values[0][3]) {
        case "P1":
            console.log(findDayOfWeek(values[0][0]) + " day of the week in the findPeriod function");
            if (readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).success) { //wanna check availabiloty of the period in that specific day
                console.log("found it here");
                addRecord(ssx, readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).num, 2, values, findDayOfWeek(values[0][0]));
            }
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                console.log("unavailable.");
                // repeatSearch(findDayOfWeek(values[0][0]), 'B3:B9', ssx, 3, values);
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

            }
            break;
        case "P2":
            if (readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                console.log("unavailable.");
                // repeatSearch(findDayOfWeek(values[0][0]), 'B12:B18', ssx, 12, values);
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")
            }
            break;
        case "P3":
            console.log("are you here RIGHT NOW ARE YOU HERE");
            if (readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                console.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")
                // repeatSearch(findDayOfWeek(values[0][0]), 'B21:B27', ssx, 21, values);
            }
            break;
        case "P4":
            if (readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                console.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

                // repeatSearch(findDayOfWeek(values[0][0]), 'B30:B36', ssx, 30, values);
            }
            break;
        case "P5":
            if (readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                console.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

                // repeatSearch(findDayOfWeek(values[0][0]), 'B39:B45', ssx, 39, values);
            }
            break;
        default:
            console.log("Could not access specified period");
    }
}
/*
Matches the timstamp day id with corresponding day
@params: values
@pre: must have a timestamp in values
@post: will return the week day name
*/

function findDayOfWeek(values) {
    var dayOfWeek = values.getDay();
    console.log(dayOfWeek + " day of wwek?");
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
        case 5: //submitted friday, moved to next week
            return " ";
        case 6:
            return " "; //submitted saturday, moved to next week
    }
}

/*
Will search through remaining days of the week to find extra availability
@params: day of submission, data range (period)/row, spreadsheet,values
@pre: must searchh from a specific reference point (weekday)
@post: will find the next available time slot, or return unavaiilbility message
*/

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
            for (i = 2; i < 5; i++) {
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(values)).val, 2, values, findDayOfWeek(values));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }
            }
            break;
        case "Wednesday":
            for (i = 3; i < 5; i++) {
                if (readCells(ssx, range, row, findDayOfWeek(i)).success) {
                    addRecord(ssx, readCells(ssx, range, row, findDayOfWeek(i)).val, 2, values, findDayOfWeek(i));
                }
                else {
                    autoEmail(values[0][1], "Appointment Unavailability", "Please submit another request startin the following week");
                }

            }
            break;
        case "Thursday":
            for (i = 4; i < 5; i++) {
                console.log(findDayOfWeek(4.0));
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
    }

}
/*
finds empty cells and returns if there is a space for append or not to higher functions
@params: spreashseet id, range (period), starting row (for convenience), weekday
@pre: sufficient range present in spreasheet, correct names/ids
@post: will return slot with  available space
*/
function readCells(ssx, range, num, weekDay) {
    console.log(weekDay);

    try { //because if submitted on friday, it wont be avialble till the next week
        var data = ssx.getSheetByName(weekDay).getRange(range);
        var values = data.getValues();

        for (var i = 0; i < values.length; i++) {
            var cellValue = values[i][0];
            var cellAddress = "B" + (i + num);
            if (cellValue === "" || cellValue === null) {
                console.log(cellAddress + " is empty.");
                console.log(num + " number");
                return {
                    val: (i + num), success: true
                };
            } else {
                console.log(cellAddress + " contains a value: " + cellValue);
            }
        }
        console.log("All cells are full, I must move to the 2nd next day.")
        return { val: null, success: false };
    } catch (e) {
        console.log("no such day. " + e.message);
        return { val: null, success: false };


    }
}
/*
appends requests to available and requested slots
@params: spreadhseet id, starting row, starting column, values, week day
@pre: must have sufficient space in spreasheet, correct names/ids
@post: will write a record to the spreadsheet.
*/
function addRecord(ssx, row, column, values, dayOfWeek) {
    let sheet = ssx.getSheetByName(dayOfWeek);
    sheet.getRange(row, column, values.length, values[0].length).setValues(values);
    autoEmail(values[0][1], 'Guidance Appointment Confirmation', 'Your request has been logged in our waitlist. Please await a confirmation email within the following day.');
}
/*
sned automatic emails
@params: recipient email, subject, body
@pre: msut recieve correct args when called
@post: will send email
*/
function autoEmail(email, subject, body) {
    console.log(email);
    try {
        MailApp.sendEmail(email, subject, body);

        console.log("Successfully sent email")

    } catch (Exception) {
        console.log("email failed to send: " + Exception.message);
    }
}


/* 
hbu
runs confirm check on a timely basis for each seperate sheet
i have no clue what I meant here by confirm.... uh OH.
@params: n/a
@pre: n/a
@post: runs confirm check
*/
//ew this is so bad I hate it i hate it i hate it i hate it i hate it i hate it 
function checkRun() {
    confirmCheck(teach1, 3);
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
/*
checks the value of checkbox at specific range, if selected, runs autoEmail
@params: spreasheet id, range of data to check
@pre: n/a
@post: confirmation email is sent
*/
function confirmCheck(ssx, range) { //because I dont have the program working across multiple days, I unfortunately won't need to inform the user of their day of week
    var emails = ssx.getActiveSheet().getRange(range).getValues();
    var times = ssx.getActiveSheet().getRange(range).getValues();
    var checks = ssx.getActiveSheet().getRange(range).getValues();
    console.log(checks);
    for (var i = 0; i < 7; i++) {
        console.log(i);
        console.log(emails[0][i] + 'email');
        console.log(checks[0][i] + " hi");
        if (checks[0][i]) {
            autoEmail(emails[0][i], "Confirmed", "Your time is at: " + times[0][i]);
        }
    }
}
