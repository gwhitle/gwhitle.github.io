// Create function to update width of text input elements
function updateInputWidth() {
    // Select all text input elements in the document
    let inputs = document.querySelectorAll('input[type="text"]');
    // Set the width of each input element to its scrollWidth
    inputs.forEach(function (input) {
        input.style.width = input.scrollWidth + 'px';
    });
}
// Call updateInputWidth to update input widths
updateInputWidth();

// Create function to get and distplay the users full name from input
function getName() {
    // Get values from input fields for first name, middle name, and last name
    let firstName = document.getElementById('firstName').value,
        middleName = document.getElementById('middleName').value,
        lastName = document.getElementById('lastName').value;

    // Concatenate the names with spaces in between, only if the part is not an empty string
    let fullName = (firstName !== '' ? firstName + " " : "") +
        (middleName !== '' ? middleName + " " : "") +
        (lastName !== '' ? lastName : "");

    // Set the innerHTML of the 'nameHeader' element with the concatenated fullName
    document.getElementById('nameHeader').innerHTML = fullName;
}
// Create function to display form data
function displayForm() {
    // Create empty object to store form data
    let formData = {};
    // Array of field IDs to collect data from
    const fieldInfo = ['personal_background', 'professional_background', 'academic_background', 'subject_background', 'primary_platform', 'current_courses', 'interesting_item', 'picture'];
    // Object mapping field IDs to field titles for display
    const fieldTitles = {
        'personal_background': 'Personal Background',
        'professional_background': 'Professional Background',
        'academic_background': 'Academic Background',
        'subject_background': 'Subject Background',
        'primary_platform': 'Primary Platform',
        'current_courses': 'Current Courses',
        'interesting_item': 'Funny/Interesting Item about Yourself'
    };

    // Clear form container before allowing new submission data
    formOutput.innerHTML = '';
    // Clear the image container
    document.getElementById('pictureContainer').innerHTML = '';

    // For each field ID
    fieldInfo.forEach(function (field) {
        let value;
        // If field is ID 'picture' get picture file
        if (field === 'picture') {
            value = document.getElementById('picture').files[0];
            formData[field] = value ? value.name : null;
        }
        else {
            //Get each value from HTML element ID
            value = document.getElementById(field).value;
            // Store field and value in formData object
            formData[field] = value;
        }

    });

    // Get the selected image file
    let imageFile = document.getElementById('picture').files[0];
    //Get the figure caption
    let figureCaption = document.getElementById('figure_caption').value;
    // Get the container for displaying the image
    let imageContainer = document.getElementById('pictureContainer');

    // If an image is selected display the image 
    if (imageFile) {
        let imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(imageFile);
        imageElement.alt = 'Selected Picture';

        // Create the caption element
        let captionElement = document.createElement('figcaption');
        captionElement.textContent = figureCaption;


        // Append the image to the container
        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(captionElement);
    }


    // Loop through formData and create list items
    for (let field in formData) {
        let updatedData = document.createElement('li');
        // Use field titles from fieldTitles mapping
        let title = fieldTitles[field];

        // If 'picture' field display the file name, if not display 'No file chosen'
        if (field === 'picture') {
            updatedData.textContent = title + ': ' + (formData[field] ? formData[field] : 'No file chosen');
        }
        else {
            updatedData.textContent = title + ': ' + formData[field];

            // Append li to the ul formOutput in html
            formOutput.appendChild(updatedData);
        }

    }
}
// Function to clear the form container label, later called on submitButton
function clearFormLabel() {
    let form = document.getElementById('formContainer');
    form.style.display = 'none';
}
// Function to show the form container label, later called on resetButton
function showFormLabel() {
    let form = document.getElementById('formContainer');
    form.style.display = 'block';
}

// Add event listener to submitButton, on click run the function()
document.getElementById('submitButton').addEventListener('click', function () {
    // Hide the form container label
    clearFormLabel();
    // Get and display the name
    getName();
    // Display the form data
    displayForm();
});

// Add event listener to resetButton, on click run the function()
document.getElementById('resetButton').addEventListener('click', function () {
    // Show the form container label
    showFormLabel();
    // Clear the content of the form container
    formOutput.innerHTML = '';
    // Clear the image container
    document.getElementById('pictureContainer').innerHTML = '';
});