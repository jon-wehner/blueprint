const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { loginUser, logoutUser } = require("../auth");
const { db, csrfProtection, asyncHandler } = require("./utils");
const {
  validationResult,
  loginValidators,
  signupValidators,
} = require("./validators");

const savePassword = async (currentUser, userPassword) => {
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  currentUser.password = hashedPassword;
  await currentUser.save();
};

const validatePassword = async (currentUser, currentPassword) => {
  if (currentUser) {
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      currentUser.password.toString()
    );
    return passwordMatch;
  }
};

router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await db.User.build();
    res.render("signup", {
      title: "Sign Up",
      user,
      token: req.csrfToken(),
    });
  })
);

router.post(
  "/signup",
  csrfProtection,
  signupValidators,
  asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await db.User.build({
      username,
      email,
      password,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      savePassword(user, password);

      const defaultGroup = await db.Group.create({ name: user.username });
      const queriedUser = await db.User.findOne({
        where: { email: user.email },
      });
      await db.UserGroup.create({
        userId: queriedUser.id,
        groupId: defaultGroup.id,
      });

      loginUser(req, res, user);
      return req.session.save((err) => {
        if (err) next(err);
        return res.redirect("/");
      });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("login", {
        title: "Sign Up",
        user,
        errors,
        token: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", {
      title: "Login",
      token: req.csrfToken(),
    });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res, next) => {
    let errors = [];
    const { email, password } = req.body;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      const sucessfulLogin = await validatePassword(user, password);

      if (sucessfulLogin) {
        loginUser(req, res, user);
        return req.session.save((err) => {
          if (err) next(err);
          return res.redirect("/home");
        });
      } else {
        errors.push("Login failed for the provided information");
      }
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("login", {
      title: "Login",
      email,
      errors,
      token: req.csrfToken(),
    });
  })
);

router.get(
  "/demo",
  asyncHandler(async (req, res, next) => {
    const email = "demo@demo.com";
    const user = await db.User.findOne({ where: { email } });

    loginUser(req, res, user);
    return req.session.save((err) => {
      if (err) next(err);
      return res.redirect("/home");
    });
  })
);

router.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    logoutUser(req, res);
    req.session.save((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  })
);

module.exports = router;
