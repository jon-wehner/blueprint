const express = require("express");
const { asyncHandler, db } = require("./utils");
const router = express.Router();

// Tasks (API's)
// -- Get
router.get(
  "/projects/:id(\\d+)/tasks",
  asyncHandler(async (req, res) => {
    const projectId = await parseInt(req.params.id, 10);
    const project = await db.Project.findByPk(projectId, {
      include: [{ model: db.Task }, { model: db.Category }],
    });
    console.log(project);
    res.status(200).json(project);
  })
);
// -- Create
router.post(
  "/projects/:id(\\d+)/tasks",
  asyncHandler(async (req, res) => {
    const { name, deadline, importance, isComplete, projectId } = req.body;
<<<<<<< HEAD
    const newTask = await db.Task.create({
      name,
      deadline,
      importance,
      isComplete,
      projectId,
    });
    res.status(201).end();
=======
    const newTask = await db.Task.create({ name, deadline, importance, isComplete, projectId });
    res.status(201).send(newTask)
    //TODO: Task validation
>>>>>>> main
  })
);
// -- Update
router.put(
  "/tasks/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const taskId = await prseInt(req.params.id, 10);
    const { name, deadline, importance, isComplete, projectId } = req.body;
    const taskToUpdate = await db.Task.findByPk(taskId);

    if (name) taskToUpdate.name = name;
    if (deadline) taskToUpdate.deadline = deadline;
    if (importance) taskToUpdate.importance = importance;
    if (isComplete) taskToUpdate.isComplete = isComplete;
    if (projectId) taskToUpdate.projectId = projectId;

    await taskToUpdate.save();
    res.status(200).end();
  })
);
// -- Delete
router.delete(
  "/tasks/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskTags = await db.TaskTag.findAll({ where: { taskId: taskId } });
    const task = await db.Task.findByPk(taskId);
    if (!task) {
      res.status(404).send("Task not found");
    }
    if (taskTags) {
      await db.TaskTag.destroy({ where: { taskId: taskId } });
    }
    await task.destroy();
    res.status(204).end();
  })
);

module.exports = router;
