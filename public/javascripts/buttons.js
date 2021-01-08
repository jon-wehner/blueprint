const taskArea = document.querySelector(".tasks-area");
const forms = document.querySelectorAll(".task-area-forms");

const groupEditButtons = document.querySelectorAll(".group-edit-button");
const editGroupForm = document.getElementById("editGroup");
const groupNameField = document.getElementById("groupName");

const projectEditButtons = document.querySelectorAll(".project-edit-button");
const editProjectForm = document.getElementById("editProject");
const projectNameField = document.getElementById("projectNameField");

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

projectEditButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const projectId = e.target.id;
    const projectName = e.target.value;

    editProjectForm.action = `/home/projects/${projectId}/edit`;
    projectNameField.value = projectName;

    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    editProjectForm.classList.remove("hidden-form");
  });
});
