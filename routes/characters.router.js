const express = require("express");
const controller = require("../controllers/characters.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

router.post("/", authenticate.isAuthenticated, controller.addOne);
router.delete("/", authenticate.isAuthenticated, authenticate.isAdmin, controller.deleteAll);

router.get("/:id", authenticate.isAuthenticated, controller.getOne);
router.put("/:id", authenticate.isAuthenticated, authenticate.isAdmin, controller.updateOne);
router.delete("/:id", authenticate.isAuthenticated, authenticate.isAdmin, controller.deleteOne);

module.exports = router;
