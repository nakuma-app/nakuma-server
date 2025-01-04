const PackAccess = require("../models/packAccess.model");

var controller = {
  getUserAccess: async (req, res, next) => {
    try {
      let packAccess = await PackAccess.findOne({ user: req.params.userId });
      res.json(packAccess);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};

module.exports = controller;
