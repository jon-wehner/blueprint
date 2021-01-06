const express = require("express");
const { asyncHandler } = require("./utils");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if (res.locals.authenticated) {
    res.redirect("/home");
  } else {
    res.redirect("/users/login");
  }
});

module.exports = router;
