
/*
Finds correpsonding teacher, triggers findperiod
@params: arrays from submit function
@pre: must have arrays with all vals
@post: call findPeriod function
*/
function findTeacher(timestamp, email, teacher, period, reason) {
    Logger.log("hreer");
    Logger.log(teacher + " are u there?????")
    var values = [[timestamp[0], email[0], reason[0], period[0]]] //google app script requires you to pass values into sheets with a 2D array, rows and cols, even if youre just using one row

    switch (String(teacher)) {

        case "Ms. Kim":
            //we have to find an empty slot
            Logger.log(period + "wwjjwj");
            Logger.log(period[0] + "so why did this work");
            findPeriod(teach3, values);
            break;
        case "Ms. Dacey":
            findPeriod(teach2, values);
            break;
        case "Ms. Avery":
            Logger.log(timestamp, email, period, reason);
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
    Logger.log(values[0][3]);
    switch (values[0][3]) {
        case "P1":
            Logger.log(findDayOfWeek(values[0][0]) + " day of the week in the findPeriod function");
            if (readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).success) { //wanna check availabiloty of the period in that specific day
                Logger.log("found it here");
                addRecord(ssx, readCells(ssx, 'B3:B9', 3, findDayOfWeek(values[0][0])).num, 2, values, findDayOfWeek(values[0][0]));
            }
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                // repeatSearch(findDayOfWeek(values[0][0]), 'B3:B9', ssx, 3, values);
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

            }
            break;
        case "P2":
            if (readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B12:B18', 12, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                // repeatSearch(findDayOfWeek(values[0][0]), 'B12:B18', ssx, 12, values);
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")
            }
            break;
        case "P3":
            Logger.log("are you here RIGHT NOW ARE YOU HERE");
            if (readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B21:B27', 21, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")
                // repeatSearch(findDayOfWeek(values[0][0]), 'B21:B27', ssx, 21, values);
            }
            break;
        case "P4":
            if (readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B30:B36', 30, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

                // repeatSearch(findDayOfWeek(values[0][0]), 'B30:B36', ssx, 30, values);
            }
            break;
        case "P5":
            if (readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).success)
                addRecord(ssx, readCells(ssx, 'B39:B45', 39, findDayOfWeek(values[0][0])).val, 2, values, findDayOfWeek(values[0][0]));
            else { //meaning, the current day failed, and there are no more spots left, so we have to sort through the remaining days to try and find a day that has available spots in their requested period.
                Logger.log("unavailable.");
                autoEmail(values[0][1], "Guidance Appointment Unavailable", "Please resumbit the form on sunday, or anytimes during the next week before friday")

                // repeatSearch(findDayOfWeek(values[0][0]), 'B39:B45', ssx, 39, values);
            }
            break;
        default:
            Logger.log("Could not access specified period");
    }
}
