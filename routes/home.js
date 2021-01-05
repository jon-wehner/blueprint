const express = require("express");
const group = require("../db/models/group");
const { asyncHandler, csrfProtection, db } = require("./utils");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const userId = await parseInt(req.session.auth.userId);
    const userGroupsQuery = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Group,
          attributes: ["name"],
          through: { attributes: [] },
          include: [
            {
              model: db.Project,
              attributes: ["name", "description", "deadline"],
              include: [
                {
                  model: db.Task,
                  attributes: ["name", "deadline", "importance", "isComplete"],
                  include: [
                    {
                      model: db.Tag,
                      attributes: ["name"],
                      through: { attributes: [] },
                    },
                  ],
                },
                {
                  model: db.Category,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });
    
    const groups = userGroupsQuery.Groups;
  
    res.render("index", { groups });
  })
);

router.post(
  "/groups",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = await parseInt(req.session.auth.userId);
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
    const groupId = req.params.id;
    const { name } = req.body;
    await db.Group.update(name, { where: { id: groupId } });

    res.redirect("/home");
  })
);
// router.post("/groups/:id(\\d+)/user"); -- If we get to implement multiuser groups

router.post(
  "/groups/:id(\\d+)/deelete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const groupId = req.params.id;
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

    await db.Project.create({ groupId, name, description, deadline, categoryId });
    res.redirect("/home");
  })
);
// -- Update
router.post(
  "/projects/:id(\\d+)/edit",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const { name, description, deadline, categoryId } = req.body;
    let newProperties = {};

    if (name) newProperties[name] = name;
    if (description) newProperties[description] = description;
    if (deadline) newProperties[deadline] = deadline;
    if (categoryId) newProperties[categoryId] = categoryId;

    await db.Project.update(newProperties, { where: { id: projectId } });
    res.redirect("/home");
  })
);
// -- Delete
router.post(
  "/projects/:id(\\d+)/delete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    await db.Project.destroy({ where: { id: projectId } });

    res.redirect("/home");
  })
);

// Tasks (API's)
// -- Create
// -- Update
// -- Delete

module.exports = router;
