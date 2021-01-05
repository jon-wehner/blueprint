const express = require("express");
const { asyncHandler, csrfProtection, db } = require("./utils");

const router = express.Router();



router.get('/', asyncHandler(async (req, res, next) => {
  const userId = await parseInt(req.session.auth.userId);
  const userGroupsQuery = await db.User.findByPk(userId, {
    include: [{
      model: db.Group,
      through: { attributes: []},
      
    }]
  })
  const userGroups = userGroupsQuery.Groups
  const userProjectsQuery = await Promise.all(userGroups.map(async (group) => {
    const projectsQuery = await db.Group.findByPk(group.id, {
      include: [{ model: db.Project }]
    })
    return projectsQuery;
  }));
  res.json(userGroups, userProjectsQuery);

}));


module.exports = router;
