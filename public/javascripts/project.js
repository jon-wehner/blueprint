const addProjectButton = document.getElementById("add-project");
const addProjectForm = document.getElementById("addProject");
const forms = document.querySelectorAll('.form');

addProjectButton.addEventListener('click', async () => {
  forms.forEach((form) => {
    form.classList.add('hidden-form');
  })
  addProjectForm.classList.remove('hidden-form');
  
});