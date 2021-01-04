const express = require("express");
const { asyncHandler } = require("./utils");
const router = express.Router();

/* GET home page. */
router.get(
  "/",
  asyncHandler((req, res, next) => {
    res.render("index", { title: "a/A Express Skeleton Home" });
  })
);

module.exports = router;
