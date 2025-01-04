const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packAccessSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
    free_pack_access_time: { type: Date, default: Date.now },
    nb_paid_packs_available: { type: Number, default: 0, min: 0 }
  },
  { collection: "packAccess", timestamps: true }
);

module.exports = mongoose.model("PackAccess", packAccessSchema);
