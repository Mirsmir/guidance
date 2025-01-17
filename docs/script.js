/*
Front end UI functions for guidance web app. Responsible for data fetching/sending requests.
@date: January 15, 2025
@author @Mirsmir
@version: 1.0
*/
/*
    gets the value of the checkboxes, boolean value
    @params: n/a
    @pre: n/a
    @post: returns the checkboxes that were clicked
*/
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

/*
    resets to default options/clears fields when form submitted
    @params: n/a
    @pre: n/a
    @post: reset/field clear
*/

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

/*
    resets the quiz upon window reload
    @params: n/a
    @pre: n/a
    @post: reset to default config
*/

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

/*
    hides the question box from the user and shows upon button click
    @params: n/a
    @pre: n/a
    @post: shows the quiz class div
*/
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

// document.getElementById('booking').addEventListener('submit', async function (event) {
//     event.preventDefault();  // Prevent default form submission

//     const form = event.target;

//     // Collect form data
//     const formData = new FormData(form);

//     // Prepare JSON object from form data
//     var jsonData = {};
//     formData.forEach((value, key) => {
//         // For checkboxes, ensure we handle multiple selections
//         if (jsonData[key]) {
//             if (Array.isArray(jsonData[key])) {
//                 jsonData[key].push(value);
//             } else {
//                 jsonData[key] = [jsonData[key], value];
//             }
//         } else {
//             jsonData[key] = value;
//         }
//     });

//     jsonData = {
//         day: "just die"
//     }

//     console.log(jsonData);

//     // The URL to your Google Apps Script endpoint
//     const scriptURL = 'https://script.google.com/macros/s/AKfycbzxQL30an6xIeH5bjQWLdMEF0Jd2Bl61rMZa9vV9eJKypqMCknW0DxJi3xxWh52yraRSA/exec   ';

//     // try {
//     //     // Send data to the Google Apps Script endpoint via POST request
//     //     const response = await fetch(scriptURL, {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify(jsonData),
//     //         redirect: "follow"

//     //     });
//     //     // Check for successful response
//     //     if (response.ok) {
//     //         const result = await response.json();
//     //         alert('Success: ' + JSON.stringify(result));
//     //     } else {
//     //         alert('Error: ' + response.statusText);
//     //     }
//     // } catch (error) {
//     //     alert('Failed to send data: ' + error.message);
//     // }

//     relaodForm();


//     fetch(scriptURL, {
//         redirect: "follow",  // Allow redirects
//         method: "POST",      // POST request
//         body: JSON.stringify(jsonData), // Send JSON data
//         headers: {
//             "Content-Type": "application/json", // Correct content type
//         },
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json(); // Parse the JSON response
//         })
//         .then(data => {
//             console.log("Success:", data);
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// });


//*****************************************************************************/
/*
    send fetch request to the app script server
    @params: n/a
    @pre: app script web app deployement url correct, and headers are present in the app script project
    @post: sends the data from the html content
*/
document.getElementById('booking').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    console.log("Form data:", formData);

    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    console.log("JSON data:", jsonData);

    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // Replace with your script ID

    try {
        console.log("Sending fetch request.");
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Fetch response status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received response data:", data);
        console.log("Success:", data);
    } catch (error) {
        console.error("Error:", error);
    }
    relaodForm();
});

