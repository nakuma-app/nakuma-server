const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    owned_by: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    character: { type: mongoose.Types.ObjectId, ref: 'Character', required: true },
    power: { type: Number, min: 0, default: 1 },
    rarity: { type: Number, min: 1, max: 5, default: 1, required: true },
    tradable: { type: Boolean, required: true, default: true },
    in_trading: { type: Boolean, required: true, default: false }
  },
  { collection: "cards", timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
