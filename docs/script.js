
function getValue() {
    //array of checkbox items
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    //do a loop that checks which one has been checked 
    var periods = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            periods.push(checkbox.value);
        }

    });


    return periods;
}

//make sure it sends the actual values of the html page
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function relaodForm() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); //idk if getElementById("period") would work
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    const selected = document.getElementById("day");
    selected.value = "Monday";

    const teach = document.getElementById("teacher");
    teach.value = "Kim";

    const written = document.getElementById("question3");
    written.value = ""

    const number = document.getElementById("number");
    number.value = ""

    const data = {
        teacher: document.getElementById("teacher").value,
        day: document.getElementById("day").value,
        period: getValue().value,
        reason: document.getElementById("question3").value
    };

    console.log("bob");
    console.log(data.day + " dayL ");

    console.log(data)


    console.log(data.teacher)


    // google.script.run.withSuccessHandler(onSuccess).processFormData(data);
}

// function onSuccess(message) {
//     //make new formm (this didn't really work...)
//     console.log("submited???")
//     alert(message)
//     document.getElementById("quiz").reset();
// }


//*****************************************************************************/


window.onload = function () { //window.onload is an event that fires whenever i reload
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); //idk if getElementById("period") would work
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    const selected = document.getElementById("day");
    selected.value = "Monday";

    const teach = document.getElementById("teacher");
    teach.value = "Kim";

    const written = document.getElementById("question3");
    written.value = ""

    const number = document.getElementById("number");
    number.value = ""
};

//*****************************************************************************/


const button = document.getElementById("button");
const questionSection = document.getElementById("quiz");

button.addEventListener("click", () => {
    if (questionSection.style.visibility === "hidden" || questionSection.style.visibility === "") {
        questionSection.style.visibility = "visible" //this makes it visible
        questionSection.style.opacity = "1";
    }

});

//*****************************************************************************/

// const submitButton = document.getElementById("button");
// const form = document.getElementById("myForm");

// submitButton.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default link behavior

//     form.submit(); // Trigger the form submit
// });

// form.addEventListener('submit', async function (event) {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     const formData = new FormData(form);
//     const jsonData = Object.fromEntries(formData.entries()); // Convert form data to JSON

//     const scriptURL = 'https://script.google.com/macros/s/AKfycbzxQL30an6xIeH5bjQWLdMEF0Jd2Bl61rMZa9vV9eJKypqMCknW0DxJi3xxWh52yraRSA/exec'; // Apps Script endpoint

//     try {
//         const response = await fetch(scriptURL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(jsonData),
//         });

//         if (response.ok) {
//             const result = await response.json();
//             alert('Success: ' + JSON.stringify(result));
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//     } catch (error) {
//         alert('Request failed: ' + error.message);
//     }
// });


//*****************************************************************************/

document.getElementById('booking').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent default form submission

    const form = event.target;

    // Collect form data
    const formData = new FormData(form);

    // Prepare JSON object from form data
    const jsonData = {};
    formData.forEach((value, key) => {
        // For checkboxes, ensure we handle multiple selections
        if (jsonData[key]) {
            if (Array.isArray(jsonData[key])) {
                jsonData[key].push(value);
            } else {
                jsonData[key] = [jsonData[key], value];
            }
        } else {
            jsonData[key] = value;
        }
    });

    // The URL to your Google Apps Script endpoint
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzxQL30an6xIeH5bjQWLdMEF0Jd2Bl61rMZa9vV9eJKypqMCknW0DxJi3xxWh52yraRSA/exec';

    try {
        // Send data to the Google Apps Script endpoint via POST request
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
            redirect: "follow"

        });

        // Check for successful response
        if (response.ok) {
            const result = await response.json();
            alert('Success: ' + JSON.stringify(result));
        } else {
            alert('Error: ' + response.statusText);
        }
    } catch (error) {
        alert('Failed to send data: ' + error.message);
    }

    relaodForm();
});

