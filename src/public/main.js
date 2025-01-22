"use strict";

window.addEventListener("load", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const emailError = document.querySelector(".emailError");
  const passwordError = document.querySelector(".passwordError");
  const ageError = document.querySelector(".ageError");
  const generalError = document.querySelector(".generalError");
  const loginError = document.querySelector(".loginError");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          if (result.field == "email") {
            emailError.innerHTML = result.message;
            return;
          } else {
            emailError.innerHTML = "";
          }

          if (result.field === "password") {
            passwordError.innerHTML = result.message;
            return;
          } else {
            passwordError.innerHTML = "";
          }

          if (result.field === "age") {
            ageError.innerHTML = result.message;
            return;
          } else {
            ageError.innerHTML = "";
          }

          if (result.field === "general") {
            generalError.innerHTML = result.message;
            return;
          } else {
            generalError.innerHTML = "";
          }
        }

        window.location.href = "/login";
      } catch (error) {
        console.log("Error DESDE JS:", error);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          loginError.innerHTML = result.message;
          return;
        }

        window.location.href = "/profile";
      } catch (error) {
        loginError.innerHTML = "Ocurrió un error en el servidor";
      }
    });
  }
});
