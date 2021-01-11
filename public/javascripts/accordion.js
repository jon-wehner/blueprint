const forms = document.querySelectorAll(".task-area-forms");
const projectArea = document.querySelector(".projects-area");
const addTaskForm = document.getElementById("addTask");
const editTaskForm = document.getElementById("editTask");
const errorContainer = document.querySelector(".error-container");

const reqDeleteTask = async (id) => {
  const url = `/api/tasks/${id}`;
  const fetchOptions = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, fetchOptions);
  return response.json();
};

projectArea.addEventListener("click", async (e) => {
  e.stopPropagation();
  const target = e.target;

  const isAccordion = target.matches(".accordion");
  const isDelete = target.matches(".task-delete-button");
  const isTask = target.matches(".project-task-list-item");
  const isAddTask = target.matches(".add-task-button");

  if (isAccordion) {
    const projectId = await parseInt(target.id, 10);
    const response = await fetch(`/api/projects/${projectId}/tasks`);
    const projectJson = await response.json();

    const panel = target.nextElementSibling;
    target.classList.toggle("active");

    panel.style.display === "block"
      ? (panel.style.display = "none")
      : (panel.style.display = "block");

    const tasks = projectJson.Tasks;
    const totalTasks = tasks.length;
    let completedCount = 0;
    tasks.forEach((task) => {
      if (task.isComplete) completedCount++;
    });

    if (totalTasks === completedCount && totalTasks !== 0) {
      target.style.backgroundColor = "green";
    }

    const currentDate = new Date();
    const dueDate = new Date(`${projectJson.deadline}T00:00:00`);

    if (
      currentDate.getTime() > dueDate.getTime() &&
      totalTasks !== completedCount
    ) {
      target.style.backgroundColor = "red";
    }

    if (panel.style.display === "block") {
      const projectName = document.getElementById("project-name-p");
      const projectDetails = document.getElementById("project-details");
      const projectCategory = document.getElementById("project-category-p");
      const projectDescription = document.getElementById(
        "project-description-p"
      );

      const projectDeadline = document.getElementById("project-deadline-p");
      const taskSummary = document.getElementById("project-task-summary-p");

      const category = projectJson.Category.name;

      const tasks = projectJson.Tasks;
      const totalTasks = tasks.length;
      let completedCount = 0;
      tasks.forEach((task) => {
        if (task.isComplete) completedCount++;
      });

      projectName.innerHTML = `Project Name: ${projectJson.name}`;
      projectCategory.innerHTML = `Category: ${category}`;
      projectDescription.innerHTML = `Description: ${projectJson.description}`;
      projectDeadline.innerHTML = `Deadline: ${projectJson.deadline}`;
      taskSummary.innerHTML = `Completed Tasks: ${completedCount}/${totalTasks}`;

      forms.forEach((form) => {
        form.classList.add("hidden-form");
      });
      projectDetails.classList.remove("hidden-form");
    } else {
      forms.forEach((form) => {
        form.classList.add("hidden-form");
      });
    }
  }

  if (isDelete) {
    const taskId = target.dataset.id;
    const task = document.getElementById(`taskRow-${taskId}`);
    reqDeleteTask(taskId);
    target.remove();
    task.remove();
  }

  if (isTask) {
    editTaskForm.dataset.id = target.id;

    const editTaskName = document.getElementById("editTaskNameField");
    const editDate = document.getElementById("editTaskDate");
    const editImportance = document.getElementById("editImportance");

    editTaskName.value = target.dataset.name;
    editDate.value = target.dataset.deadline;
    editImportance.value = target.dataset.importance;

    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });

    editTaskForm.classList.remove("hidden-form");
    errorContainer.classList.add("hidden-form");
  }

  if (isAddTask) {
    const projectIdField = document.getElementById("addProjectIdField");
    const projectId = target.id;

    addTaskForm.dataset.url = `/api/projects/${projectId}/tasks/`;
    projectIdField.value = projectId;

    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    addTaskForm.classList.remove("hidden-form");
  }
});
