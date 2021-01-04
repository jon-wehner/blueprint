const csrf = require("csurf");
const db = require("../db/models");

const csrfProtection = csrf({ cookie: true });
const asyncHandler = (cb) => (req, res, next) => cb(req, res, next).catch(next);

module.exports = { db, csrfProtection, asyncHandler };
