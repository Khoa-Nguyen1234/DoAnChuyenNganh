const mongoose = require("mongoose");

const Size = mongoose.model(
  "Size",
  new mongoose.Schema({
    size: String
  })
);

module.exports = Size;