const addGroupButton = document.getElementById("add-group");
const addGroupForm = document.getElementById("addGroup");
const forms = document.querySelectorAll(".task-area-forms");
const groupList = document.getElementById("groupList");
const editGroupForm = document.getElementById("editGroup");
const groupNameField = document.getElementById("groupName");

addGroupButton.addEventListener("click", async () => {
  forms.forEach(form => {
    form.classList.add("hidden-form");
  });
  addGroupForm.classList.remove("hidden-form");
});

const postForm = async (url, formData) => {
  const formPlainObj = Object.fromEntries(formData.entries());
  const formJson = JSON.stringify(formPlainObj);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formJson,
  });
  const responseJson = await response.json();

  const liNewGroup = document.createElement("li");
  liNewGroup.innerText = responseJson.name;
  const buttonNewGroup = document.createElement("button");
  buttonNewGroup.innerText = "Edit";
  buttonNewGroup.setAttribute("value", responseJson.name);
  buttonNewGroup.setAttribute("id", responseJson.id);
  buttonNewGroup.classList.add("group-edit-button");

  buttonNewGroup.addEventListener("click", e => {
    const groupId = e.target.id;
    const groupName = e.target.value;
    console.log(groupName);
    editGroupForm.action = `/home/groups/${groupId}/name`;
    groupNameField.value = groupName;

    forms.forEach(form => {
      form.classList.add("hidden-form");
    });
    editGroupForm.classList.remove("hidden-form");
  });

  groupList.appendChild(liNewGroup);
  groupList.appendChild(buttonNewGroup);
  if (!response.ok) {
    //TODO Error Handling
  }
};
addGroupForm.addEventListener("submit", async e => {
  const formData = new FormData(addGroupForm);
  e.preventDefault();
  try {
    await postForm("/home/groups", formData);
  } catch (err) {
    console.error(err);
  }
});
