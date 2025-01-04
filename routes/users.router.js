const express = require("express");
const controller = require("../controllers/users.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

router.get("/:id", authenticate.isAuthenticated, controller.getOne);
router.put("/:id", authenticate.isAuthenticated, controller.updateOne);
router.delete("/:id", authenticate.isAuthenticated, authenticate.isAdmin, controller.deleteOne);

module.exports = router;
