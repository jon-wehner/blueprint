const tasksArea = document.querySelector(".tasks-area");
const taskListItems = document.querySelectorAll(".project-task-list-item");
const taskDeleteButtons = document.querySelectorAll(".task-delete-btn");
const addTaskForm = document.getElementById("addTask")
const addTaskBtns = document.querySelectorAll(".add-task-button")
const addTaskSubmit = document.getElementById("addTaskSubmit")
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
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const projectIdField = document.getElementById("projectIdField")
    const projectId = e.target.id

    addTaskForm.dataset.url = `/api/projects/${projectId}/tasks/`
    projectIdField.value= projectId
    addTaskForm.classList.toggle("hidden-form")
  })
});

//Helper function to convert form data to json and post to API
const postForm = async (url, formData) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(plainFormObj);
  const response = await fetch(url, {
    method: "POST",
    body: formJson,
  });
  if(!response.ok) {
    //TODO Error Handling
  }
}

//Submits the form data to API endpoint when form is submitted
addTaskSubmit.addEventListener("click", async (e) => {
  const formData = new FormData(addTaskForm)
  const url = addTaskForm.dataset.url
  try {
    await postForm({url, formData})
  } catch (err) {
    console.error(error)
  }
  e.preventDefault()
})
