const express = require("express");
const group = require("../db/models/group");
const { asyncHandler, csrfProtection, db } = require("./utils");

const router = express.Router();

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
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

router.post(
  "/groups/:id(\\d+)/delete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const groupId = await parseInt(req.params.id, 10);
    await db.Group.destroy({ where: { id: groupId } });
    //When Implementing Multiple-User Groups revisit this deletion method
    await db.UserGroup.destroy({ where: { groupId } });
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
// -- Delete
router.post(
  "/projects/:id(\\d+)/delete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const projectId = await parseInt(req.params.id, 10);
    await db.Project.destroy({ where: { id: projectId } });

    res.redirect("/home");
  })
);

// Tasks (API's)
// -- Create
// -- Update
// -- Delete

module.exports = router;
