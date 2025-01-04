const Card = require("../models/cards.model");

var controller = {
  addOne: async (req, res, next) => {
    try {
      let cards = await Card.create(req.body);
      res.json(cards);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      let cards = await Card.findById(req.params.id)
        .populate('owned_by', 'username')
        .populate('character', 'name media_title image_url');
      res.json(cards);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  getCardsByUser: async (req, res, next) => {
    try {
      let cards = await Card.find({ owned_by: req.params.userId })
        .populate('character', 'name media_title image_url');
      res.json(cards);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  updateOne: async (req, res, next) => {
    try {
      let cards = await Card.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(cards);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      let resp = await Card.findByIdAndDelete(req.params.id);
      res.json(resp);
    }
    catch(err) {
      console.log(err);
      next(err);
    }
  },

  deleteAll: async (req, res, next) => {
    let resp = await Card.remove({});
    res.json(resp);
  },
};

module.exports = controller;
