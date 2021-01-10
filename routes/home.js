const express = require("express");
const { asyncHandler, csrfProtection, db } = require("./utils");
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const router = express.Router();

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = await parseInt(req.session.auth.userId, 10);
    const categories = await db.Category.findAll();
    const tags = await db.Tag.findAll();

    const userGroupsQuery = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Group,
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: db.Project,
              attributes: ["id", "name", "description", "deadline"],
              include: [
                {
                  model: db.Task,
                  attributes: [
                    "id",
                    "name",
                    "deadline",
                    "importance",
                    "isComplete",
                  ],
                  include: [
                    {
                      model: db.Tag,
                      attributes: ["id", "name"],
                      through: { attributes: [] },
                    },
                  ],
                },
                {
                  model: db.Category,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });

    const groups = userGroupsQuery.Groups;

    res.render("index", { groups, categories, tags, token: req.csrfToken() });
  })
);

//create new group
router.post(
  "/groups",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = await parseInt(req.session.auth.userId, 10);
    const { name } = req.body;

    const newGroup = await db.Group.create({ name });
    await db.UserGroup.create({ userId, groupId: newGroup.id });
    res.redirect("/home");
  })
);

//edit group
router.post(
  "/groups/:id(\\d+)/name",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const groupId = await parseInt(req.params.id, 10);
    const { name } = req.body;
    const groupToUpdate = await db.Group.findByPk(groupId);
    groupToUpdate.name = name;
    await groupToUpdate.save();

    res.redirect("/home");
  })
);
// router.post("/groups/:id(\\d+)/user"); -- If we get to implement multiuser groups

router.get(
  "/groups/:id(\\d+)/delete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const groupId = await parseInt(req.params.id, 10);

    const groupProjects = await db.Project.findAll({ where: { groupId } });
    const projectIdArray = groupProjects.map((project) => project.id);

    const groupProjectTasks = await db.Task.findAll({
      where: { projectId: projectIdArray },
    });

    const taskIdArray = groupProjectTasks.map((task) => task.id);

    await db.TaskTag.destroy({ where: { taskId: taskIdArray } });
    await db.Task.destroy({ where: { projectId: projectIdArray } });
    await db.Project.destroy({ where: { groupId } });
    await db.UserGroup.destroy({ where: { groupId } });
    await db.Group.destroy({ where: { id: groupId } });

    res.redirect("/home");
  })
);

// Projects
// -- Create
router.post(
  "/projects",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { groupId, name, description, deadline, categoryId } = req.body;

    await db.Project.create({
      groupId,
      name,
      description,
      deadline,
      categoryId,
    });
    res.redirect("/home");
  })
);
// -- Update
router.post(
  "/projects/:id(\\d+)/edit",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const projectId = await parseInt(req.params.id, 10);
    const { name, description, deadline, categoryId } = req.body;
    const updateProject = await db.Project.findByPk(projectId);

    if (name !== "") updateProject.name = name;
    if (description !== "") updateProject.description = description;
    if (deadline !== "") updateProject.deadline = deadline;
    if (categoryId !== updateProject.categoryId)
      updateProject.categoryId = categoryId;

    await updateProject.save();
    res.redirect("/home");
  })
);

//search request
router.put("/search", asyncHandler(async (req, res) => {
  const { query } = req.body

  const results = await db.Task.findAll()
  // ({
  //   where: {
  //     name: {
  //       [Op.iLike]: query
  //     }
  //   }
  // });
  res.render("search", { results})
}));

module.exports = router;
