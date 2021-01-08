const groupList = document.getElementById("groupList");
const forms = document.querySelectorAll(".task-area-forms");

const groupNameField = document.getElementById("groupName");
const addGroupButton = document.getElementById("add-group");
const addGroupForm = document.getElementById("addGroup");
const editGroupForm = document.getElementById("editGroup");

addGroupButton.addEventListener("click", async () => {
  forms.forEach((form) => {
    form.classList.add("hidden-form");
  });
  addGroupForm.classList.remove("hidden-form");
});

