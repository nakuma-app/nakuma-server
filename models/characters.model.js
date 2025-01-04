const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    apiId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    media_title: { type: String, required: true },
    image_url: { type: String, required: true },
    nb_favorites: { type: Number, default: 0 }
  },
  { collection: "characters", timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);
