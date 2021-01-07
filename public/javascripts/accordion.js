const projects = document.querySelectorAll(".accordion");
const projectDescription = document.getElementById("project-description");

projects.forEach((project) => {
  project.addEventListener("click", async (e) => {
    const projectId = await parseInt(e.target.dataset.id);
    const panel = project.nextElementSibling;
    project.classList.toggle("active");

    panel.style.display === "block"
      ? (panel.style.display = "none")
      : (panel.style.display = "block");

    const projectDetails = document.getElementById("project-details");
    const projectCategory = document.getElementById("project-category-p");
    const projectDescription = document.getElementById("project-description-p");
    const projectDeadline = document.getElementById("project-deadline-p");
    const taskSummary = document.getElementById("project-task-summary-p");
    const editProjectBtn = document.querySelector(".project-edit-button");

    const response = await fetch(`/api/projects/${projectId}/tasks`);
    const projectJson = await response.json();
    const category = projectJson.Category.name;

    const tasks = projectJson.Tasks;
    const totalTasks = tasks.length;
    let completedCount = 0;
    tasks.forEach((task) => {
      if (task.isComplete) completedCount++;
    });

    projectCategory.innerHTML = category;
    projectDescription.innerHTML = projectJson.description;
    projectDeadline.innerHTML = projectJson.deadline;
    taskSummary.innerHTML = `Completed Tasks: ${completedCount}/${totalTasks}`;

    editProjectBtn.setAttribute("id", projectId);
    editProjectBtn.setAttribute("value", projectJson.name);

    projectDetails.classList.remove("hidden");
  });
});
