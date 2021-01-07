const tasksArea = document.querySelector(".tasks-area");
const taskListItems = document.querySelectorAll(".project-task-list-item");
const taskDeleteButtons = document.querySelectorAll(".task-delete-btn");
const taskForm = document.getElementById("addEditTask")
const addTaskBtns = document.querySelectorAll(".add-task-button")
const taskItemsArray = Array.from(taskListItems);
const deleteButtonsArray = Array.from(taskDeleteButtons);

deleteButtonsArray.forEach(btn => {
  btn.addEventListener("click", async () => {
    await fetch(`/api/tasks/${btn.dataset.id}`, {
      method: "DELETE",
      body: JSON.stringify({ id: btn.dataset.id }),
    });
    const task = document.getElementById(`task-${btn.dataset.id}`)
    task.remove()
    btn.remove()
  });
});

//Shows and hides the task form to edit a task when clicked
taskItemsArray.forEach(task => {
  task.addEventListener("click", e => {
    taskForm.classList.toggle("hidden-form")
  });
});

//Shows and Hides the form when "Add Task" is clicked
addTaskBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskForm.classList.toggle("hidden-form")
  })
})
