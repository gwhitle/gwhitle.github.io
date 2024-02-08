// Create function to update width of text input elements
function updateInputWidth(input) {
    input.style.width = input.scrollWidth + 'px';
}
// Call updateInputWidth to update input widths
document.querySelectorAll('input[type="text"]').forEach(input => {
    updateInputWidth(input);
    input.addEventListener('input', function () {
        updateInputWidth(this);
    });
});


// Create function to get and distplay the users full name from input
function getName() {
    // Get values from input fields for first name, middle name, and last name
    let firstName = document.getElementById('firstName').value,
        middleName = document.getElementById('middleName').value,
        lastName = document.getElementById('lastName').value;

    // Handle cases where only initials are provided
    // Check if the middle name has a length of 1 and add a period if true
    if (middleName.length === 1) {
        middleName += ".";
    }
    // Check if the last name has a length of 1 and add a period if true
    if (lastName.length === 1) {
        lastName += ".";
    }

    // Concatenate the names with spaces in between, only if the part is not an empty string
    let fullName = (firstName !== '' ? firstName + " " : "") +
        (middleName !== '' ? middleName + " " : "") +
        (lastName !== '' ? lastName : "");

    // Set the innerHTML of the 'nameHeader' element with the concatenated fullName
    document.getElementById('nameHeader').innerHTML = fullName;
}

// Create function to add course input amounts input from number of courses
function addCourseInputs() {
    // Clear previous input
    let courseInputContainer = document.getElementById('courseInputsContainer');
    courseInputContainer.innerHTML = '';

    // Get number of courses entered
    let numCourses = (document.getElementById('num_courses').value);

    // Create input fields for course names base on number of courses
    for (let i = 1; i <= numCourses && numCourses <= 6; i++) {
        let courseInput = document.createElement('input');
        courseInput.type = 'text';
        courseInput.id = 'course' + i;
        courseInputContainer.appendChild(courseInput)
    }
}
// Add event listener to numCourses input, on input run to add course inputs
document.getElementById('num_courses').addEventListener('input', addCourseInputs);

// Create function to display form data
function displayForm() {
    // Create empty object to store form data
    let formData = {};
    // Array of field IDs to collect data from
    const fieldInfo = ['personal_background', 'professional_background', 'academic_background', 'subject_background', 'primary_platform', 'num_courses', 'interesting_item', 'picture'];
    // Object mapping field IDs to field titles for display
    const fieldTitles = {
        'personal_background': 'Personal Background',
        'professional_background': 'Professional Background',
        'academic_background': 'Academic Background',
        'subject_background': 'Subject Background',
        'primary_platform': 'Primary Platform',
        'num_courses': 'Current Courses',
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
        else if (field === 'num_courses') {
            // Handle course inputs separately
            let courseList = document.createElement('ul');
            courseList.id = 'currentCoursesList';

            for (let i = 1; i <= formData[field]; i++) {
                let courseItem = document.createElement('li');
                let courseInput = document.getElementById('course' + i).value;
                courseItem.textContent = 'Course ' + i + ': ' + courseInput;
                courseList.appendChild(courseItem);
            }
            let currentCoursesTitle = document.createElement('li');
            currentCoursesTitle.textContent = title;

            updatedData.appendChild(currentCoursesTitle);
            updatedData.appendChild(courseList);
        }
        else {
            updatedData.textContent = title + ': ' + formData[field];
        }
        // Append li to formOutput in html
        formOutput.appendChild(updatedData);
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

// Function to validate all fields
function validateAllFields() {
    // Array of field IDs to validate
    const requiredFields = ['firstName', 'middleName', 'lastName', 'personal_background', 'professional_background', 'academic_background', 'subject_background', 'primary_platform', 'num_courses', 'interesting_item', 'picture', 'course1', 'course2', 'course3', 'course4', 'course5', 'course6'];

    // Validate each required field
    for (let field of requiredFields) {
        let value;

        // If field is ID 'picture' get picture file
        if (field === 'picture') {
            let pictureInput = document.getElementById(field);
            if (pictureInput.files.length === 0) {
                alert('Please choose an image to upload');
                return false;  // Picture input is empty, return false
            }
            value = pictureInput.files[0];
        } else if (field === 'num_courses') {
            // Validate 'num_courses' field
            value = document.getElementById(field).value;
            if (!/^[1-6]$/.test(value)) {
                alert('Please enter a number 1-6 for Current courses');
                return false;  // 'num_courses' is not a valid number between 1 and 6
            }
        }
        else if (field.startsWith('course')) {
            // Validate dynamically created course input fields
            let courseInput = document.getElementById(field);
            if (courseInput && courseInput.value.trim() === '') {
                return false;  // Course input is empty, return false
            }
        } else {
            // Get each value from HTML element ID
            value = document.getElementById(field).value;
        }
        // Check if the value is empty
        if (value === '' || value === null) {
            return false;  // Field is empty, return false
        }
    }
    return true;  // All fields are valid
}
// Add event listener to submitButton, on click run the function()
document.getElementById('submitButton').addEventListener('click', function () {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Validate all fields
    let allFieldsValid = validateAllFields();

    if (allFieldsValid) {
        // If all fields are valid
        // Hide the form container label
        clearFormLabel();
        // Get and display the name
        getName();
        // Display the form data
        displayForm();
    } else {
        // If not all fields are valid
        alert('Please ensure that no fields are left empty.');
    }
});

// Add event listener to resetButton, on click run the function()
document.getElementById('resetButton').addEventListener('click', function () {
    // Show the form container label
    showFormLabel();
    // Clear the content of the form container
    formOutput.innerHTML = '';
    // Clear the image container
    document.getElementById('pictureContainer').innerHTML = '';
    document.getElementById('courseInputsContainer').innerHTML = '';
});