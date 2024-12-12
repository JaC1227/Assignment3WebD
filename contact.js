document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const spinner = document.getElementById("spinner");
    const responseMessage = document.getElementById("responseMessage");
  
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
        const response = await fetch("/.netlify/functions/contact", {
          method: "POST",
          body: JSON.stringify({
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          spinner.classList.add("hidden");
          responseMessage.classList.remove("hidden");
        } else {
          throw new Error("Failed to submit form.");
        }
      } catch (error) {
        alert("There was an error submitting the form. Please try again.");
        form.classList.remove("hidden");
        spinner.classList.add("hidden");
      }
    });
  });
  