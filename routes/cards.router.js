const express = require("express");
const controller = require("../controllers/cards.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

router.get("/user/:userId", authenticate.isAuthenticated, controller.getCardsByUser);

router.post("/", authenticate.isAuthenticated, controller.addOne);
router.delete("/", authenticate.isAuthenticated, authenticate.isAdmin, controller.deleteAll);

router.get("/:id", authenticate.isAuthenticated, controller.getOne);
router.put("/:id", authenticate.isAuthenticated, controller.updateOne);
router.delete("/:id", authenticate.isAuthenticated, controller.deleteOne);

module.exports = router;
