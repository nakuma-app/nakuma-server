const User = require("../models/users.model");

var controller = {
  getOne: async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id);
      res.json(user);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  updateOne: async (req, res, next) => {
    try {
      let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(user);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      let resp = await User.findByIdAndDelete(req.params.id);
      res.json(resp);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },
};

module.exports = controller;
