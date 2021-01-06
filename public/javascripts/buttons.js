const groupEditButtons = document.querySelectorAll(".group-edit-button");
const projectEditButtons = document.querySelectorAll(".project-edit-button");
const taskArea = document.querySelector(".tasks-area");

groupEditButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const groupId = e.target.id;
    const groupName = e.target.value;
    const csrfToken = e.target.dataset.token;

    taskArea.innerHTML = `
  <form action="/home/groups/${groupId}/name" method="POST">
    <h3>Edit Group</h3>
    <div>
      <input type="hidden" name="_csrf" value=${csrfToken}>
      <label>Group Name:</label>
      <input name="name" type="text" value=${groupName}>
    </div>
    <input type="submit" value="Update Group">
  </form>`;
  })
);

projectEditButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const projectId = e.target.id;
    const projectName = e.target.value;
    const csrfToken = e.target.dataset.token;

    taskArea.innerHTML = `
    <form action="/home/projects/${projectId}/edit">
      <h3>Edit Project</h3>
      <div>
        <input type="hidden" name="_csrf" value=${csrfToken}>
        <label>Project Name:</label>
        <input type="text name="name" value=${projectName}>
        <></label>
      </div>
    </form>`;
  });
});
