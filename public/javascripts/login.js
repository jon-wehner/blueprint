const signupSelect = document.querySelector(".signup-text");
const loginSelect = document.querySelector(".login-text");

const formContainer = document.querySelector(".form-container");
const submitButton = document.querySelector(".submit-btn");

const form = document.querySelector(".form");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const swapClass = (removeElement, addElement, className, optClassName) => {
  if (optClassName) {
    removeElement.classList.add(className);
    removeElement.classList.remove(optClassName);
    addElement.classList.add(optClassName);
    addElement.classList.remove(className);
  } else {
    removeElement.classList.remove(className);
    addElement.classList.add(className);
  }
};

loginSelect.addEventListener("click", () => {
  swapClass(
    loginSelect,
    signupSelect,
    "active-selection",
    "inactive-selection"
  );
  swapClass(loginForm, signupForm, "hidden");
});

signupSelect.addEventListener("click", () => {
  swapClass(
    signupSelect,
    loginSelect,
    "active-selection",
    "inactive-selection"
  );
  swapClass(signupForm, loginForm, "hidden");
});
