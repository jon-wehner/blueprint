const addGroupButton = document.getElementById("add-group");
const addGroupForm = document.getElementById("addGroup")
const forms = document.querySelectorAll('.form');
const formsArray = Array.from(forms);
addGroupButton.addEventListener('click', async () => {
  formsArray.forEach((form) => {
    form.classList.add('hidden-form');
  })
  addGroupForm.classList.remove('hidden-form');
  
});