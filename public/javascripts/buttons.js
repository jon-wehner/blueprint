const taskArea = document.querySelector(".tasks-area");
const forms = document.querySelectorAll(".task-area-forms");

const groupEditButtons = document.querySelectorAll(".group-edit-button");
const editGroupForm = document.getElementById("editGroup");
const groupNameField = document.getElementById("groupName");

groupEditButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const groupId = e.target.id;
    const groupName = e.target.value;

    editGroupForm.action = `/home/groups/${groupId}/name`;
    groupNameField.value = groupName;

    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    editGroupForm.classList.remove("hidden-form");
  })
);
