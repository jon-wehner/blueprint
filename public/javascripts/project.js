const addProjectButton = document.getElementById("add-project");
const addProjectForm = document.getElementById("addProject");
const forms = document.querySelectorAll(".task-area-forms");

const postForm = async (url, formData, httpMethod) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(formPlainObj);

  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: formJson,
  });
  if (!response.ok) {
    //TODO Error Handling
  }
  return response;
};

addProjectButton.addEventListener("click", () => {
  forms.forEach((form) => {
    form.classList.add("hidden-form");
  });
  addProjectForm.classList.remove("hidden-form");
});
