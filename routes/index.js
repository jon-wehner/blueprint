var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "a/A Express Skeleton Home" });
});

router.get("/rob", (req, res, next) => {
  res.render("login");
});

module.exports = router;
