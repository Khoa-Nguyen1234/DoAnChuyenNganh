const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    bodyPart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BodyPart"
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gender"
    },
  })
);

module.exports = Category;