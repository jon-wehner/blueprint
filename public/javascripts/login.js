const signupSelect = document.querySelector(".signup-text");
const loginSelect = document.querySelector(".login-text");
const formContainer = document.querySelector(".form-container");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const demoButton = document.getElementById("demo-btn");

loginSelect.addEventListener("click", function () {
  this.classList.add("active-selection");
  this.classList.remove("inactive-selection");
  signupSelect.classList.add("inactive-selection");
  signupSelect.classList.remove("active-selection");
  demoButton.classList.remove("hidden");
  formContainer.innerHTML = `
  <div class="form-item">
  <label for="email"> Email:</label>
  <input type="text" name="email" />
</div>
<div class="form-item">
  <label for="password"> Password:</label>
  <input type="password" name="password" />
</div>
  `;
  submitButton.innerText = "Log In";
  form.setAttribute("action", "/users/login");
  form.setAttribute("method", "POST");
});

signupSelect.addEventListener("click", function () {
  this.classList.add("active-selection");
  this.classList.remove("inactive-selection");
  loginSelect.classList.add("inactive-selection");
  loginSelect.classList.remove("active-selection");
  demoButton.classList.add("hidden");
  formContainer.innerHTML = `
  <div class="form-item">
  <label for="username"> Username:</label>
  <input type="text" name="username" />
</div>
<div class="form-item">
  <label for="email"> Email:</label>
  <input type="email" name="email" />
</div>
<div class="form-item">
  <label for="password"> Password:</label>
  <input type="password" name="password" />
</div>
<div class="form-item">
  <label for="confirmPassword"> Confirm Password:</label>
  <input type="password" name="confirmPassword" />
</div>
  `;
  submitButton.innerText = "Create Account";
  form.setAttribute("action", "/users/signup");
});
