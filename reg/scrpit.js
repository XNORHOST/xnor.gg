const form = document.querySelector("form");
const nextBtn = form.querySelector(".nextBtn");
const backBtn = form.querySelector(".backBtn");

// Select all required inputs AND selects from the first form
const firstFormRequiredInputs = form.querySelectorAll(".form.first [required]");

nextBtn.addEventListener("click", () => {
    let isValid = true;
    
    // Check if all required fields in the first form are filled
    firstFormRequiredInputs.forEach(input => {
        if (input.value.trim() === "") {
            isValid = false;
            // Optionally add a visual indication for the user (e.g., a red border)
            input.style.border = '1px solid red';
        } else {
            input.style.border = '1px solid #aaa'; // Reset border for valid fields
        }
    });

    if (isValid) {
        form.classList.add('secActive');
    } else {
        form.classList.remove('secActive');
        alert("Please fill in all required fields in the Personal Details and ID Details sections.");
    }
});

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

