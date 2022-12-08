const mongoose = require("mongoose");

const Color = mongoose.model(
  "Color",
  new mongoose.Schema({
    color: String,
    code: String,
  })
);

module.exports = Color;