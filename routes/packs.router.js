const express = require("express");
const controller = require("../controllers/packs.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");

router.post("/open", authenticate.isAuthenticated, authenticate.isUser, controller.openPack);
router.get("/buy", authenticate.isAuthenticated, authenticate.isUser, controller.buyPack);
router.post("/add", authenticate.isAuthenticated, authenticate.isUser, controller.addPack);

module.exports = router;
