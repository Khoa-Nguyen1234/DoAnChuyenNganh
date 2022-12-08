const mongoose = require("mongoose");

const BodyPart = mongoose.model(
  "BodyPart",
  new mongoose.Schema({
    name: String,
    gender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gender"
    }],
  })
);

module.exports = BodyPart;