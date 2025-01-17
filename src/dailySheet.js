/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
    Adding functions for daily run things. This will keep track of the sheets that should be in the database. 
    @date: January 15, 2025
    @author @Mirsmir
    @version: 1.0
*/

/*
runs create sheet on a timely basis for each seperate sheet
@params: n/a
@pre: n/a 
@post: runs create sheet
*/

function runAdd() {
    console.log("avery: ")
    createSheets(teach1);
    console.log("called create")
    console.log("dacey: ")
    createSheets(teach2);
    console.log("kim: ")
    createSheets(teach3);
}
// var allSheets = teacherSheets.getSheets();


function initialAdd() {
    console.log("avery:");
    initialVersion(teach1);
    console.log("dacey");
    initialVersion(teach2);
    console.log("kim");
    initialVersion(teach3);
}

function initialVersion(teacherSheet) {

    for (let i = 0; i < 15; i++) {
        const today = new Date();
        console.log(formatDate(today));
        const newName = formatDate(new Date(today.setDate(today.getDate() + i)));
        teacherSheet.insertSheet(newName);
        const rangeToCopy = teacherSheet.getSheetByName("Template").getDataRange();
        rangeToCopy.copyTo(teacherSheet.getSheetByName(newName).getRange(1, 1));



    }
    //part 6, 7, 9 for first link??? 
    // for the second link: classes, inheritance, recursion
    //very little grade 11 related stuff
    //
}
//automatic creating and deletion of week day sheets:
/*
@post: Creates a set of days for the next week, with corresponding names 
@params: spreadsheet id
@pre: n/a
@post: create new sheet with week names
*/
function createSheets(teacherSheets) {

    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // apparenertly the Date() fuction has overflow and underflow capabilities, so I won't have a 0th day of the month
    const yesterdayName = formatDate(yesterday);
    console.log(yesterdayName)
    const newSheetName = formatDate(new Date(today.setDate(today.getDate() + 14))); //onec again will change month and year if necessary
    console.log(newSheetName)
    yesteryear(0, yesterdayName, teacherSheets.getSheets(), teacherSheets);

    if (!teacherSheets.getSheetByName(newSheetName)) { //make sure theres no duplicates 
        const newSheet = teacherSheets.insertSheet(newSheetName);
    }
}
/*
@post: format the date properly
@params: date to be formated
@pre: date exists
@post: return formated string
*/
function formatDate(date) {//  format  date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/*recursively search to find the previous year 
@post: will delete the sheet
@params: index, name/current date/url to sheet
*/

function yesteryear(i, yesterdayName, teacherSheets, sheet) {

    if (i >= teacherSheets.length) {
        return;
    }

    console.log(teacherSheets.length)
    console.log(teacherSheets[i].getName())
    console.log(teach1.getSheetByName(formatDate(new Date())) + "hello");
    console.log();

    if (teacherSheets[i] && teacherSheets[i].getName() === yesterdayName) {
        sheet.deleteSheet(teacherSheets[i]);
        return;
    }

    yesteryear(i + 1, yesterdayName, teacherSheets, sheet);

}
