const accordionArea = document.querySelector(".accordion-area");

const addProjectButton = document.getElementById("add-project");
const addProjectForm = document.getElementById("addProject");
const forms = document.querySelectorAll(".task-area-forms");

const editProjectButtons = document.querySelectorAll(".project-edit-button");
const editProjectForm = document.getElementById("editProject");
const projectNameField = document.getElementById("projectNameField");

addProjectButton.addEventListener("click", () => {
  forms.forEach((form) => {
    form.classList.add("hidden-form");
  });
  addProjectForm.classList.remove("hidden-form");
});

editProjectButtons.forEach((button) => {
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

const reqDeleteProject = async (id) => {
  const route = `/api/projects/${id}`;
  const reqParams = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(route, reqParams);
  return response.json();
};

accordionArea.addEventListener("click", (e) => {
  const deleteButton = e.target;
  const projectId = e.target.id;
  const isDelete = deleteButton.matches(".project-delete-button");

  if (isDelete) {
    const projectDiv = document.getElementById(projectId);
    reqDeleteProject(projectId);
    deleteButton.remove();
    projectDiv.nextSibling.innerHTML = "";
    projectDiv.nextSibling.remove();
    projectDiv.remove();
  }
});
