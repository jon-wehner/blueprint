const groupEditButtons = document.querySelectorAll(".group-edit-button");
const projectEditButtons = document.querySelectorAll(".project-edit-button");
const taskArea = document.querySelector(".tasks-area");
const editGroupForm = document.getElementById("editGroup");
const editProjectForm = document.getElementById("editProject");
const groupNameField = document.getElementById("groupName");
const projectNameField = document.getElementById("projectNameField");
const taskAreaForms = document.querySelectorAll(".task-area-forms");
const projectDetails = document.getElementById("project-details");

groupEditButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const groupId = e.target.id;
    const groupName = e.target.value;

    editGroupForm.action = `/home/groups/${groupId}/name`;
    groupNameField.value = groupName;
  })
);

projectEditButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const projectId = e.target.id;
    const projectName = e.target.value;
    editProjectForm.action = `/home/projects/${projectId}/edit`;
    projectNameField.value = projectName;
  });
});

taskAreaForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    form.classList.remove("hidden-form");
  });
});
