const taskListItems = document.querySelectorAll(".project-task-list-item");
const tasksArea = document.querySelector(".tasks-area");
const taskItemsArray = Array.from(taskListItems);

taskItemsArray.forEach((task) => {
  task.addEventListener("click", (e) => {
    tasksArea.innerHTML = `<form>
    <h3>Edit Task</h3>
    <div>
      <label>Task Name:</label>
      <input type="text" id="edited-task-name" value="${task.innerText}"/>
    </div>
    <div>
      <label>Due Date:</label>
      <input type="date" id="edited-task-date" />
    </div>
    <div>
      <p>Importance Level:</p>
      <div>
        <input type="radio" name="importance-level" checked />
        <label for="huey">Regular</label>
      </div>

      <div>
        <input type="radio" name="importance-level" />
        <label for="dewey">Priority</label>
      </div>

      <div>
        <input type="radio" name="importance-level" />
        <label for="louie">Urgent</label>
      </div>
    </div>
    <div>
      <label>Completed?</label>
      <input type="checkbox" id="edited-task-completion-status" />
    </div>
    <button>Update Task</button>
  </form>`;
  });
});
