const addProjectButton = document.getElementById("add-project");
const addProjectForm = document.getElementById("addProject");
const forms = document.querySelectorAll('.form');
const formsArray = Array.from(forms);
addProjectButton.addEventListener('click', async () => {
  formsArray.forEach((form) => {
    form.classList.add('hidden-form');
  })
  addProjectForm.classList.remove('hidden-form');
  
});