const editButton = document.getElementsByClassName('edit-button');
editButton.addEventListener('click', () => {
  tasksArea.innerHTML = `<form>
    <h3>Edit Group</h3>
    <div>
      <label>Group Name:</label>
      <input name="name" type="text" id="edited-task-name" />
    </div>
    <button>Update Group</button>
  </form>`;
})