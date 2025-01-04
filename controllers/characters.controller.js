const Character = require("../models/characters.model");

var controller = {
  addOne: async (req, res, next) => {
    try {
      let character = await Character.create(req.body);
      res.json(character);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      let character = await Character.findById(req.params.id);
      res.json(character);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  updateOne: async (req, res, next) => {
    try {
      let character = await Character.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(character);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      let resp = await Character.findByIdAndDelete(req.params.id);
      res.json(resp);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  deleteAll: async (req, res, next) => {
    let resp = await Character.remove({});
    res.json(resp);
  },
};

module.exports = controller;
