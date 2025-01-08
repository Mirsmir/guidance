/*

*/


const ssx = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1btTT5Ns4p90v53gnw1ulDOMByTYSpj33zy9YO99G2kE/edit?resourcekey=&gid=375523362#gid=375523362');

const teach1 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qr3CVw9SAR-xFSaGGi9gpSXyujdP9pb3wbyHGdF89DE/edit?gid=0#gid=0'); //avery
const teach2 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1hCOdZW6d1kWZoFX9n8V5CyKuLtORy90PrCHxgF1R2TI/edit?gid=0#gid=0'); //dacey
const teach3 = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1IGNt9RAm6-Re4BIWc7GJl7q-oL-tLDwE4WNLinb4sc0/edit?gid=0#gid=0'); //kim

/*
runs create sheet on a timely basis for each seperate sheet
@params: n/a
@pre: n/a
@post: runs create sheet 
*/
function runAdd() {
    createSheets(teach1);
    createSheets(teach2);
    createSheets(teach3);
}
//automatic creating and deletion of week day sheets:
/*
@post: Creates a set of days for the next week, with corresponding names 
@params: spreadsheet id
@pre: n/a
@post: create new sheet with week names
*/
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

function updateSheets() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets();

    // Get today's date
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // apparenertly the Date() fuction has overflow and underflow capabilities, so I won't have a 0th day of the month

    const yesterdayName = formatDate(yesterday);
    const newSheetName = formatDate(new Date(today.setDate(today.getDate() + 14))); //onec again will change month and year if necessary

    // Delete the sheet for "yesterday" if it exists
    for (let i = 0; i < sheets.length; i++) {
        if (sheets[i].getName() === yesterdayName) {
            spreadsheet.deleteSheet(sheets[i]);
            break;
        }
    }



    // Add a new sheet for "today + 2 weeks"
    if (!spreadsheet.getSheetByName(newSheetName)) {
        const newSheet = spreadsheet.insertSheet(newSheetName);
        newSheet.getRange("A1").setValue(`Sheet for ${newSheetName}`);
    }
}

//  format  date as "YYYY-MM-DD"
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function yesteryear() {



}