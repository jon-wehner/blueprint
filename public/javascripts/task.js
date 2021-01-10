const editTaskForm = document.getElementById("editTask");
const addTaskForm = document.getElementById("addTask");
const errorContainer = document.querySelector(".error-container");

//Helper function to convert form data to json and post to API

const createDelButton = (id) => {
  const delButton = document.createElement("i");
  delButton.classList.add("fas", "fa-trash-alt", "task-delete-btn");
  delButton.dataset.id = id;
  const td = document.createElement("td");
  td.append(delButton);
  return td;
};

const fillTableCell = (data) => {
  const td = document.createElement("td");
  const p = document.createElement("p");
  p.classList.add("project-task-list-item");
  p.innerText = data;
  td.append(p);
  return td;
};

const createTableRow = (task) => {
  const tableRow = document.createElement("tr");
  const values = Object.values(task);
  const taskData = values.slice(1, 4);
  console.log(taskData);
  taskData.forEach((el) => {
    tableRow.append(fillTableCell(el));
  });
  tableRow.append(createDelButton(task.id));
  return tableRow;
};

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

//Helper function that displays errors when creating or editing tasks
const displayErrors = (err) => {
  errorContainer.classList.remove("hidden", "hidden-form");
  const errorArray = err.message.split(",");

  const errorList = document.createElement("ul");
  errorArray.forEach((error, i) => {
    const errorLi = document.createElement("li");
    errorLi.innerText = errorArray[i];
    errorList.appendChild(errorLi);
  });
  errorContainer.appendChild(errorList);
};

//Submits the form data to API endpoint when add task form is submitted
addTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(addTaskForm);
  const url = addTaskForm.dataset.url;
  const method = "POST";

  try {
    let response = await postForm(url, formData, method);
    response = await response.json();

    if (response.id) {
      const taskTableBody = document.getElementById(
        `projectList-${response.projectId}`
      );

      const tableRow = createTableRow(response);
      taskTableBody.appendChild(tableRow);
    } else {
      throw new Error(response);
    }
  } catch (err) {
    displayErrors(err);
  }
});

//Edit task form submit listener
editTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(editTaskForm);
  let taskId = e.target.dataset.id;
  console.log(taskId);
  taskId = taskId.slice(5);
  const url = `/api/tasks/${taskId}`;
  const method = "PUT";

  try {
    let response = await postForm(url, formData, method);
    response = await response.json();

    if (response.id) {
      const taskItem = document.getElementById(`task-${response.id}`);
      taskItem.innerHTML = response.name;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    displayErrors(err);
  }
});
