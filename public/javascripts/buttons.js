const taskArea = document.querySelector(".tasks-area");
const forms = document.querySelectorAll(".task-area-forms");
const groupList = document.getElementById("groupList")
const groupEditButtons = document.querySelectorAll(".group-edit-button");
const editGroupForm = document.getElementById("editGroup");
const groupNameField = document.getElementById("groupName");
const editGroupCsrf = document.getElementById("editGroupToken")

//Edit Group
groupList.addEventListener("click", e => {
  const target = e.target
  const groupId = e.target.dataset.id;
  const groupName = e.target.value;
  const token = e.target.dataset.token;
  const isEdit = target.matches(".group-edit-btn")

  if(isEdit){
    editGroupForm.action = `/home/groups/${groupId}/name`;
    groupNameField.value = groupName;
    editGroupCsrf.value = token
    forms.forEach((form) => {
      form.classList.add("hidden-form");
    });
    editGroupForm.classList.remove("hidden-form");
  }
})

