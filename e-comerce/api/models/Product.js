const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{ 
        type: String,
        required: true,
    },
    sold:{
        type: Number,
        required: true,
    },
    active:{
        type: Boolean,
        required: true,
    },
    photos: [{
        type: String,
        require:false,
    }],
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        require: true,
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gender"
    },
    bodyPart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BodyPart"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
    }],
    color: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    }],
})


module.exports = mongoose.model('Product', ProductSchema);