const addGroupButton = document.getElementById("add-group");
const addGroupForm = document.getElementById("addGroup")
addGroupButton.addEventListener('click', async () => {
  // await fetch('/home/groups', {method: 'POST', body: JSON.stringify({name})}
  addGroupForm.classList.remove('hidden-form');
  
});