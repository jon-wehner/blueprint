const signupSelect = document.querySelector(".signup-text");
const loginSelect = document.querySelector(".login-text");

const formContainer = document.querySelector(".form-container");
const submitButton = document.querySelector(".submit-btn");

const form = document.querySelector(".form");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

loginSelect.addEventListener("click", () => {
  loginSelect.classList.add("active-selection");
  loginSelect.classList.remove("inactive-selection");

  signupSelect.classList.add("inactive-selection");
  signupSelect.classList.remove("active-selection");

  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupSelect.addEventListener("click", () => {
  signupSelect.classList.add("active-selection");
  signupSelect.classList.remove("inactive-selection");

  loginSelect.classList.add("inactive-selection");
  loginSelect.classList.remove("active-selection");

  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});
