const tasksArea = document.querySelector(".tasks-area");
const forms = document.querySelectorAll(".task-area-forms");

const taskListItems = document.querySelectorAll(".project-task-list-item");
const accordionArea = document.querySelector(".accordion-area")

const taskEditButtons = document.querySelectorAll(".task-edit-btn");
const editTaskForm = document.getElementById("editTask");

const addTaskForm = document.getElementById("addTask");
const addTaskBtns = document.querySelectorAll(".add-task-button");


const fetchDeleteTask =async (id) => {
  const url = `/api/tasks/${id}`
  const fetchOptions = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json"
    },
  };
  const response = await fetch(url, fetchOptions);
  return response.json()
};

//Refactored Event Listener for Delete Buttons
accordionArea.addEventListener("click", e => {
  const btn = e.target
  const btnId = e.target.dataset.id
  const taskRow = document.getElementById(`task-${btnId}`)
  const isDelete = btn.matches(".task-delete-btn")

  if (isDelete) {
    fetchDeleteTask(btnId)
    btn.remove();
    taskRow.remove();
  };
})

//Shows and hides the task form to edit a task when clicked
taskListItems.forEach((task) => {
  task.addEventListener("click", (e) => {
    editTaskForm.dataset.taskId = e.target.id;
    //To do: populate text field with existing task name
    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    editTaskForm.classList.remove("hidden-form");
  });
});

//Shows and Hides the form when "Add Task" is clicked
addTaskBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();

    const projectIdField = document.getElementById("projectIdField");
    const projectId = e.target.id;

    addTaskForm.dataset.url = `/api/projects/${projectId}/tasks/`;
    projectIdField.value = projectId;

    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    addTaskForm.classList.remove("hidden-form");
  });
});

//Helper function to convert form data to json and post to API
const postForm = async (url, formData, httpMethod) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(formPlainObj);

  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: formJson,
  });
  if (!response.ok) {
    //TODO Error Handling
  }
  return response;
};

const createDelButton = (id) => {
  const delButton = document.createElement("i");
  delButton.classList.add("fas", "fa-trash-alt", "task-delete-btn");
  delButton.dataset.id = id;
  const td = document.createElement("td");
  td.append(delButton)
  return td;
};

const fillTableCell = (data) => {
  const tableRow = document.createElement("tr");
  const td = document.createElement("td");
  const p = document.createElement("p");
  p.innerText = data;
  td.append(p);
  return td
}

const createTableRow = (task) => {
  const tableRow = document.createElement("tr");
  const values = Object.values(task)
  const taskData = values.slice(1,4)
  console.log(taskData)
  taskData.forEach(el => {
    tableRow.append(fillTableCell(el))
  });
  tableRow.append(createDelButton(task.id))
  console.log(tableRow)
  return tableRow;
};

//Submits the form data to API endpoint when add task form is submitted
addTaskForm.addEventListener("submit", async (e) => {
  const formData = new FormData(addTaskForm);
  const url = addTaskForm.dataset.url;
  const method = "POST";
  e.preventDefault();

  try {
    let response = await postForm(url, formData, method);
    response = await response.json();

    const taskTableBody = document.getElementById(
      `projectList-${response.projectId}`
    );

    const tableRow = createTableRow(response);

    taskTableBody.appendChild(tableRow);
  } catch (err) {
    console.error(err);
  }
});

//Edit task form submit listener
editTaskForm.addEventListener("submit", async (e) => {
  const formData = new FormData(editTaskForm);

  let taskId = e.target.dataset.taskId;
  taskId = taskId.slice(5);

  const url = `/api/tasks/${taskId}`;
  const method = "PUT";
  e.preventDefault();

  try {
    let response = await postForm(url, formData, method);
    response = await response.json();

    const taskItem = document.getElementById(`task-${response.id}`);
    taskItem.innerHTML = response.name;
  } catch (err) {
    console.error(err);
  }
});
