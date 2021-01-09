const projects = document.querySelectorAll(".accordion");
const forms = document.querySelectorAll(".task-area-forms");
const accordionArea = document.querySelector(".accordion-area");

accordionArea.addEventListener("click", async (e) => {
  e.stopPropagation()
  const project = e.target
  const projectId = await parseInt(e.target.id, 10);
  const response = await fetch(`/api/projects/${projectId}/tasks`);
  const projectJson = await response.json();
  const isAccordion = project.matches(".accordion")
  if(isAccordion){
    const panel = project.nextElementSibling;
    project.classList.toggle("active");

    panel.style.display === "block"
      ? (panel.style.display = "none")
      : (panel.style.display = "block");

    const currentDate = new Date();
    const dueDate = new Date(projectJson.deadline);

    if (currentDate.getTime() > dueDate.getTime()) {
      project.style.backgroundColor = "red";
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
});
