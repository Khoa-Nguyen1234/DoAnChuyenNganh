const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    createDate: {
        type: Date,
        require: true,
    },
    deleteDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: [{
        product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
        product_name: {
            type:String,
            require: true,
        },
        quantity: {
        type: Number,
        require: true,
    },
        price: {
        type: Number,
        require: true,
    },
        color :{
        type: String,
        require: true,
    },
        size: {
        type: String,
        require: true,
    }}],
    totalPrice: {
        type: Number,
    },
    status:{
        type: String,
        require: true,
    },
    toCancel:{
        type: String,
    }
  })
);

module.exports = Order;