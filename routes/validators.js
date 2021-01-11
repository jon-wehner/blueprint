const { check, validationResult } = require("express-validator");
const { db } = require("./utils.js");

const signupValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for User Name")
    .isLength({ max: 150 })
    .withMessage("User Name must not be more than 150 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 150 })
    .withMessage("Email Address must not be more than 150 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom(value => {
      return db.User.findOne({ where: { email: value } }).then(user => {
        if (user) {
          return Promise.reject("The provided Email Address is already in use by another account");
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .isLength({ min: 8 })
    .withMessage("Password must not be less than 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

const loginValidators = [
  check("email").exists({ checkFalsy: true }).withMessage("Please provide a value for Email Address"),
  check("password").exists({ checkFalsy: true }).withMessage("Please provide a value for Password"),
];

const taskValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for the task name.")
    .isLength({ max: 150 })
    .withMessage("Task name cannot be more than 150 characters long"),
  check("deadline").exists({ checkFalsy: true }).withMessage("Please enter a valid deadline for this task."),
  check("importance").exists({ checkFalsy: true }).withMessage("Please select a level of importance for this task."),
  check("isComplete").exists({ checkFalsy: true }).withMessage("Please verify if the task is completed or not."),
];

const projectValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for the project name.")
    .isLength({ max: 150 })
    .withMessage("Project name cannot be more than 150 characters long"),
  check("deadline").exists({ checkFalsy: true }).withMessage("Please enter a valid deadline for this project."),
  check("groupId").exists({ checkFalsy: true }).withMessage("Please provide a valid group"),
  check("categoryId").exists({ checkFalsy: true }).withMessage("Please select a category for this project"),
];

module.exports = {
  validationResult,
  loginValidators,
  signupValidators,
  taskValidators,
  projectValidators
};
