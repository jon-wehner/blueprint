const addGroupButton = document.getElementById("add-group");
const addGroupForm = document.getElementById("addGroup");
const forms = document.querySelectorAll(".task-area-forms");
// const addGroupSubmitButton = document.getElementById('addGroupSubmit');

addGroupButton.addEventListener("click", async () => {
  forms.forEach((form) => {
    form.classList.add("hidden-form");
  });
  addGroupForm.classList.remove("hidden-form");
});

const postForm = async (url, formData) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(formPlainObj);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formJson,
  });
  if (!response.ok) {
    //TODO Error Handling
  }
};
addGroupForm.addEventListener("submit", async (e) => {
  const formData = new FormData(addGroupForm);
  e.preventDefault();
  try {
    await postForm("/home/groups", formData);
  } catch (err) {
    console.error(err);
  }
});
