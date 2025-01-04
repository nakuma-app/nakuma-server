const express = require("express");
const controller = require("../controllers/pack-access.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

router.get("/:userId", authenticate.isAuthenticated, authenticate.isUser, controller.getUserAccess);

module.exports = router;
