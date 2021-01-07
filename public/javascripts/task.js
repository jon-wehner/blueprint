const tasksArea = document.querySelector(".tasks-area");
const taskListItems = document.querySelectorAll(".project-task-list-item");
const taskEditButtons = document.querySelectorAll(".task-edit-btn")
const taskDeleteButtons = document.querySelectorAll(".task-delete-btn");
const addTaskForm = document.getElementById("addTask")
const editTaskForm = document.getElementById("editTask")
const addTaskBtns = document.querySelectorAll(".add-task-button")

taskDeleteButtons.forEach(btn => {
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
taskListItems.forEach(task => {
  task.addEventListener("click", e => {
    editTaskForm.classList.remove("hidden-form")
    editTaskForm.dataset.taskId = e.target.id
    //To do: populate text field with existing task name
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
const postForm = async (url, formData, httpMethod) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(formPlainObj);
  console.log(formJson)
  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json"
    },
    body: formJson,
  });
  if(!response.ok) {
    //TODO Error Handling
  }
  return response
}

//Submits the form data to API endpoint when add task form is submitted
addTaskForm.addEventListener("submit", async (e) => {
  const formData = new FormData(addTaskForm)
  const url = addTaskForm.dataset.url
  const method = "POST"
  e.preventDefault()
  try {
    let response = await postForm(url, formData, method)
    response = await response.json();
    const taskList = document.getElementById(`projectList-${response.projectId}`);
    const taskItem = document.createElement("li");
    taskItem.innerHTML = response.name;
    taskList.appendChild(taskItem);
  } catch (err) {
    console.error(err)
  }
})

//Edit task form submit listener
editTaskForm.addEventListener("submit", async (e) => {
  const formData = new FormData(editTaskForm)
  let taskId= e.target.dataset.taskId
  taskId = taskId.slice(5)
  const url = `/api/tasks/${taskId}`
  const method = "PUT"
  e.preventDefault()
  try {
    let response = await postForm(url, formData, method)
    response = await response.json();
    const taskItem = document.getElementById(`task-${response.id}`);
    taskItem.innerHTML = response.name;
  } catch (err) {
    console.error(err)
  }
})

