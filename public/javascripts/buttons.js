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
      <label>Name:</label>
      <input name="name" type="text" value=${groupName}>
    </div>
    <input type="submit" value="Update Group">
  </form>`;
  })
);

projectEditButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const projectId = e.target.id;
    const csrfToken = e.target.dataset.token;
    const categories = e.target.dataset.categories;
    const parsedCategories = JSON.parse(categories);

    taskArea.innerHTML = `
    <form action="/home/projects/${projectId}/edit" method="post">
      <h3>Edit Project</h3>
      <div>
        <input type="hidden" name="_csrf" value="${csrfToken}">

        <label>Name:</label>
        <input type="text" name="name">

        <label>Description:</label>
        <textarea name="description"></textarea>

        <label>Deadline:</label>
        <input type="date" name="deadline">

        <label>Category</label>
        <select name="categoryId" id="categorySelect"></select>
      </div>
      </div>
      <input type="submit" value="Update Project">
    </form>`;

    const selectMenu = document.getElementById("categorySelect");

    Array.from(parsedCategories).forEach((category) => {
      console.log(category);
      const newOption = document.createElement("option");
      newOption.textContent = category.name;
      newOption.value = category.id;
      selectMenu.appendChild(newOption);
    });
  });
});
