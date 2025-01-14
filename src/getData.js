
// class getData {

//     doPost(e) {
//         const data = JSON.parse(e.postData.contents);
//         Logger.log(data); //wanna check wtf is happening

//         return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'seemes like it worked', data: data })).setMimeType(ContentService.MimeType.JSON);

//     }
// }

// function doPost(e) {
//     const fetchInstance = new getData();
//     return fetchInstance.doPost(e);
// }

// const appInstance = new app();

// function submit() {
//     appInstance.submit();

// }

// function findTeacher() {
//     appInstance.findTeacher();
// }

// function findPeriod() {
//     appInstance.findPeriod();
// }

// function findDayOfWeek() {
//     appInstance.findDayOfWeek();
// }

// function repeatSearch() {
//     appInstance.repeatSearch();
// }

// function readCells() {
//     appInstance.readCells();
// }

// function addRecord() {
//     appInstance.addRecord();
// }

// function autoEmail() {
//     appInstance.autoEmail();
// }

// function checkRun() {
//     appInstance.checkRun();
// }

// function confirmCheck() {
//     appInstance.confirmCheck();
// }
