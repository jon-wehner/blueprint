const express = require("express");
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

module.exports = router;
