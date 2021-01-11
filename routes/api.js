const express = require("express");
const { asyncHandler, db } = require("./utils");
const { taskValidators, validationResult } = require("./validators");
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
    res.status(200).json(project);
  })
);
// -- Create
router.post(
  "/projects/:id(\\d+)/tasks",
  taskValidators,
  asyncHandler(async (req, res) => {
    const { name, deadline, importance, isComplete, projectId } = req.body;
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const newTask = await db.Task.create({
        name,
        deadline,
        importance,
        isComplete,
        projectId,
      });
      // res.status(201).send(newTask);
      res.render("table-row", { newTask, status: 200 })
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.errors = errors;
      res.status(500).send(errors);
    }
    //TODO: Task validation
  })
);
// -- Update
router.put(
  "/tasks/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const taskId = await parseInt(req.params.id, 10);
    const { name, deadline, importance, isComplete, projectId } = req.body;
    console.log(req.body);
    const taskToUpdate = await db.Task.findByPk(taskId);
    console.log(taskToUpdate);

    if (name) taskToUpdate.name = name;
    if (deadline) taskToUpdate.deadline = deadline;
    if (importance) taskToUpdate.importance = importance;
    if (isComplete) taskToUpdate.isComplete = isComplete;
    if (projectId) taskToUpdate.projectId = parseInt(projectId, 10);

    await taskToUpdate.save();
    res.status(200).send(taskToUpdate);
  })
);
// -- Delete
router.delete(
  "/tasks/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskTags = await db.TaskTag.findAll({ where: { taskId } });
    const task = await db.Task.findByPk(taskId);
    if (!task) {
      res.status(404).send("Task not found");
    }
    if (taskTags) {
      await db.TaskTag.destroy({ where: { taskId } });
    }
    await task.destroy();
    res.status(204);
  })
);

router.delete(
  "/projects/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const projectId = await parseInt(req.params.id, 10);

    const projectTasks = await db.Task.findAll({
      where: { projectId },
    });

    const taskIdArray = projectTasks.map((task) => {
      return task.id;
    });

    await db.TaskTag.destroy({ where: { taskId: taskIdArray } });
    await db.Task.destroy({ where: { projectId } });
    await db.Project.destroy({ where: { id: projectId } });
    res.json({ message: "items sucessfully deleted" });
  })
);

module.exports = router;
