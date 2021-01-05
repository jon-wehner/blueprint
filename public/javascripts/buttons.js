const editButtons = document.querySelectorAll('.edit-button');
const taskArea = document.querySelector(".tasks-area")

editButtons.forEach( button=> button.addEventListener('click', (e) => {
  // e.preventDefault();
  const groupId = e.target.id
  const groupName = e.target.value
  const csrfToken = e.target.dataset.token
  console.log(groupId)
  taskArea.innerHTML = `
  <form action="/home/groups/${groupId}/name" method="POST">
    <h3>Edit Group</h3>
    <div>
      <input type="hidden" name="_csrf" value=${csrfToken}>
      <label>Group Name:</label>
      <input name="name" type="text" value="${groupName}" />
    </div>
    <input type="submit" value="Update Group">
  </form>`;

}))
