// Define the generateProfileContent function before it is used
function generateProfileContent(formData, htmlContent) {
    htmlContent += `
      </figure>
      <ul>
        <li>Personal background: ${formData.get("personal-background")}</li>
        <li>Professional Background: ${formData.get("professional-background")}</li>
        <li>Academic Background: ${formData.get("academic-background")}</li>
        <li>Background in this Subject: ${formData.get("subject-background")}</li>
        <li>Primary Computer Platform: ${formData.get("primary-platform")}</li>
        <li>Courses I'm in & Why: ${formData.get("courses")}
          <ul>
    `;
  
    // Collect course names and information
    const courseNames = formData.getAll("course-name[]");
    const courseInfos = formData.getAll("course-info[]");
  
    // Add each course to the list
    courseNames.forEach((courseName, index) => {
      htmlContent += `<li><b>${courseName}</b>: ${courseInfos[index]}</li>`;
    });
  
    htmlContent += `
          </ul>
        </li>
        <li>Funny/Interesting Item about Yourself: ${formData.get("funny-item")}</li>
      </ul>
    `;
  
    // Show generated profile, hide the form, and show the reset button
    document.getElementById("generatedprofile").innerHTML = htmlContent;
    document.getElementById("generatedprofile").classList.remove("hidden");
    document.getElementById("profileform").classList.add("hidden");
    document.getElementById("resetbutton").classList.remove("hidden");
  
    // Hide the "Fill out your information" heading after form submission
    document.getElementById("formheading").classList.add("hidden");
  }
  
  // Add new course input pair
  document
    .getElementById("add-course")
    .addEventListener("click", function () {
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("course-item");
      courseDiv.innerHTML = `
      <input type="text" name="course-name[]" value="">
      <input type="text" name="course-info[]" value="">
      <button type="button" class="remove-course">Remove</button>
    `;
      document.getElementById("course-list").appendChild(courseDiv);
  
      // Add event listener to remove button
      courseDiv
        .querySelector(".remove-course")
        .addEventListener("click", function () {
          courseDiv.remove();
        });
    });
  
  // Handle form submission
  document
    .getElementById("profileform")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from reloading the page
  
      const formData = new FormData(e.target);
      const figureImgFile = formData.get("figure-img"); // Get the image file
  
      let htmlContent = `
        <h2>Introduction</h2>
        <figure>
      `;
  
      // Check if the user selected an image
      if (figureImgFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
          htmlContent += `
          <img src="${event.target.result}" alt="${formData.get("figure-caption")}">
          <figcaption>${formData.get("figure-caption")}</figcaption>
        `;
          generateProfileContent(formData, htmlContent);
        };
        reader.readAsDataURL(figureImgFile); // Read the selected image file as Data URL
      } else {
        htmlContent += `<figcaption>${formData.get("figure-caption")}</figcaption>`;
        generateProfileContent(formData, htmlContent);
      }
    });
  
  // Reset button event listener
  document
    .getElementById("resetbutton")
    .addEventListener("click", function () {
      document.getElementById("profileform").reset(); // Reset form fields
      document.getElementById("generatedprofile").classList.add("hidden");
      document.getElementById("profileform").classList.remove("hidden");
      document.getElementById("resetbutton").classList.add("hidden");
  
      // Show the "Fill out your information" heading again when reset
      document.getElementById("formheading").classList.remove("hidden");
    });
