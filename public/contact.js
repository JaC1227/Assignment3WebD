document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

    const spinner = document.getElementById("spinner");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Validate email
      const email = form.querySelector("#email").value;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return; // Stop form submission if email is invalid
      }
  
      // Hide form and show spinner
      form.classList.add("hidden");
      spinner.classList.remove("hidden");
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          spinner.classList.add("hidden");
          successMessage.classList.remove("hidden");
        } else {
          throw new Error("Failed to submit form.");
        }
      } catch (error) {
        alert("There was an error submitting the form. Please try again.");
        form.classList.remove("hidden");
        spinner.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        console.error("Error submitting form:", error);  // Log the error for debugging
      }
    });
  });
  