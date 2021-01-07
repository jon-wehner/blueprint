const signupSelect = document.querySelector(".signup-text");
const loginSelect = document.querySelector(".login-text");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const demoButton = document.getElementById("demo-login-btn");

const swapClass = (element1, className, optElement2, optClassName) => {
  if (optClassName) {
    element1.classList.add(className);
    element1.classList.remove(optClassName);
    optElement2.classList.add(optClassName);
    optElement2.classList.remove(className);
  } else if (optElement2) {
    element1.classList.remove(className);
    optElement2.classList.add(className);
  } else {
    if (element1.classList.contains(className)) {
      element1.classList.remove(className);
    } else {
      element1.classList.add(className);
    }
  }
};

loginSelect.addEventListener("click", () => {
  swapClass(
    loginSelect,
    "active-selection",
    signupSelect,
    "inactive-selection"
  );
  swapClass(loginForm, "hidden", signupForm);
  swapClass(demoButton, "hidden");
});

signupSelect.addEventListener("click", () => {
  swapClass(
    signupSelect,
    "active-selection",
    loginSelect,
    "inactive-selection"
  );
  swapClass(signupForm, "hidden", loginForm);
  swapClass(demoButton, "hidden");
});
