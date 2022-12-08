const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: [{
        product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
        quantity: {
        type: Number,
        require: true,
    },
        price: {
        type: Number,
        require: true,
    },
        color_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    },
        size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size"
    }}],
    totalPrice: {
        type: Number,
    }
  })
);

module.exports = Cart;