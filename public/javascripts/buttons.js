const groupEditButtons = document.querySelectorAll(".group-edit-button");
const projectEditButtons = document.querySelectorAll(".project-edit-button");
const taskArea = document.querySelector(".tasks-area");
const editGroupForm = document.getElementById("editGroup");
const editProjectForm = document.getElementById("editProject");
const groupNameField = document.getElementById("groupName");
const projectNameField = document.getElementById("projectNameField");
const taskAreaForms = document.querySelectorAll(".task-area-forms");

groupEditButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const groupId = e.target.id;
    const groupName = e.target.value;

    editGroupForm.action = `/home/groups/${groupId}/name`;
    groupNameField.value = groupName;
    editGroupForm.classList.toggle("hidden-form");
  })
);

projectEditButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const projectId = e.target.id;
    const projectName = e.target.value;
    editProjectForm.action = `/home/projects/${projectId}/edit`;
    projectNameField.value = projectName;
    editProjectForm.classList.toggle("hidden-form");
  });
});

taskAreaForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    form.classList.toggle("hidden-form");
  });
});
