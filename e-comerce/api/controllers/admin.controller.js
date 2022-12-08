const config = require("../configs/auth.configs");
const db = require("../models");
const multer = require('multer');
const _ = require('underscore');
const nodemailer = require("nodemailer");
 



const User = db.user;
const Role = db.role;
const Product = db.product;
const Size = db.size;
const Category = db.category;
const Color = db.color;
const Cart = db.cart;
const Order =db.order;

var jwt = require("jsonwebtoken");

exports.productManagement = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
    const sort = req.query.sort ? parseInt(req.query.sort) : 0;
    const toSort = [['createDate',-1], ['name',1],['sold'-1]];
    const totalPage = await Product.find({active: true}).countDocuments();
    const result = await Product.find({active: true}).skip((page-1)*perPage).limit(perPage).sort([[toSort[sort][0], toSort[sort][1]]]).lean();
    const product = result.map(product => ({_id: product._id, photos: product.photos, name: product.name, quantity: product.quantity, price: product.price, createDate: product.createDate, sold: product.sold}));
    res.send({product, totalPage: Math.ceil(totalPage/perPage), totalProduct: totalPage});
    return;
}


exports.deleteProduct = async (req, res) => {
    const product_id = req.params.product_id;
    Product.findById(product_id, (err, product) =>{
        if(err) {
            res.status(500).send({message: err});
        }
        if(product){
            product.active = false;
            product.save((err) => {
                if(err) {
                    res.status(501).send({message: err});
                }
                res.send({message: "delete success"});
            })
        }
    })
}


exports.changeStock = async (req, res) => {
    const product_id = req.params.product_id;
    const new_stock = req.body.quantity;
    Product.findById(product_id, (err, product) =>{
        if(err) {
            res.status(500).send({message: err});
        }
        if(product){
            if(new_stock > product.quantity) {product.quantity = new_stock;}
            product.save((err) => {
                if(err) {
                    res.status(501).send({message: err});
                }
                res.send({message: "change stock success"});
            })
        }
    })
}

exports.orderManagement = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
    const sort = req.query.sort ? parseInt(req.query.sort) : 0;
    const toSort = ['createDate'];
    const totalPage = await Order.find().countDocuments();
    const result = await Order.find().skip((page-1)*perPage).limit(perPage).sort([[toSort[sort], -1]]).lean();
    const order = result.map(order => ({_id: order._id, product: order.product, totalPrice: order.totalPrice, status: order.status, createDate: order.createDate}));
    res.send({order, totalPage: Math.ceil(totalPage/perPage), totalOrder: totalPage});
    return;
}

exports.updateOrder = async (req, res) => {
    const order_id = req.params.order_id;
    const newState = req.body.status;
    Order.findById(order_id, (err, order) =>{
        if(err) {
            res.status(500).send({message: err});
        }
        if(order){
            if(newState) {order.status = newState;}
            order.save((err) => {
                if(err) {
                    res.status(501).send({message: err});
                }
                res.send({message: "change state success"});
            })
        }
    })
}