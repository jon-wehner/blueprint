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
    res.json(groups); //add-csurf-protection-token
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
  "/groups/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const groupId = req.params.id;
    await db.Group.destroy({ where: { id: groupId } });
    //When Implementing Multiple-User Groups revisit this deletion method
    await db.UserGroup.destroy({ where: { groupId } });
  })
);

// Projects
// -- Create
// -- Update
// -- Delete

// Tasks (API's)
// -- Create
// -- Update
// -- Delete

module.exports = router;
