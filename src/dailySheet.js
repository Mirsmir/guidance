/*

*/

/*
runs create sheet on a timely basis for each seperate sheet
@params: n/a
@pre: n/a hello???
@post: runs create sheet
*/
// function rundd() {
//     createSheets(teach1);
//     createSheets(teach2);
//     createSheets(teach3);
// }

// function initialVersion() {

// }
// //automatic creating and deletion of week day sheets:
// /*
// @post: Creates a set of days for the next week, with corresponding names
// @params: spreadsheet id
// @pre: n/a
// @post: create new sheet with week names
// */
// function createSheets(sheets) {

//     const today = new Date();
//     const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); // apparenertly the Date() fuction has overflow and underflow capabilities, so I won't have a 0th day of the month

//     const yesterdayName = formatDate(yesterday);
//     const newSheetName = formatDate(new Date(today.setDate(today.getDate() + 14))); //onec again will change month and year if necessary

//     yesteryear(1, yesterdayName, sheets);

//     if (!sheets.getSheetByName(newSheetName)) { //make sure theres no duplicates
//         const newSheet = sheets.insertSheet(newSheetName);
//     }
// }
// /*
// @post: format the date properly
// @params: date to be formated
// @pre: date exists
// @post: return formated string
// */
// function formatDate(date) {//  format  date as "YYYY-MM-DD"
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}-${month}-${day}`;
// }

// /*recursively search to find the previous year
// @post: will delete the sheet
// @params: index, name/current date/url to sheet
// */

// function yesteryear(i, yesterdayName, sheets) {

//     if (sheets.getSheets()[i].getName() === yesterdayName) {
//         sheets.deleteSheet(sheets.getSheets()[i]);
//         return;
//     }

//     yesteryear(i + 1, yesterdayName, sheets);

// }